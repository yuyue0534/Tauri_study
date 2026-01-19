import React, { useState } from 'react';
import { Wrench, Eye, Code, Save, FolderOpen } from 'lucide-react';

// ==================== 类型定义 ====================
const COMPONENT_TYPES = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  DATE: 'date',
  NUMBER: 'number',
  SWITCH: 'switch',
};

const DEFAULT_COMPONENTS = [
  { type: COMPONENT_TYPES.INPUT, label: '单行文本', icon: '📝' },
  { type: COMPONENT_TYPES.TEXTAREA, label: '多行文本', icon: '📄' },
  { type: COMPONENT_TYPES.NUMBER, label: '数字输入', icon: '🔢' },
  { type: COMPONENT_TYPES.SELECT, label: '下拉选择', icon: '📋' },
  { type: COMPONENT_TYPES.RADIO, label: '单选框', icon: '🔘' },
  { type: COMPONENT_TYPES.CHECKBOX, label: '多选框', icon: '☑️' },
  { type: COMPONENT_TYPES.DATE, label: '日期选择', icon: '📅' },
  { type: COMPONENT_TYPES.SWITCH, label: '开关', icon: '🔀' },
];

// ==================== Schema 管理器 ====================
class SchemaManager {
  static createField(type, id) {
    const base = {
      id,
      type,
      label: `${DEFAULT_COMPONENTS.find(c => c.type === type)?.label || '字段'}_${id.slice(-4)}`,
      required: false,
      placeholder: '',
    };

    const typeConfig = {
      [COMPONENT_TYPES.SELECT]: { options: [{ label: '选项1', value: 'opt1' }] },
      [COMPONENT_TYPES.RADIO]: { options: [{ label: '选项1', value: 'opt1' }] },
      [COMPONENT_TYPES.CHECKBOX]: { options: [{ label: '选项1', value: 'opt1' }] },
      [COMPONENT_TYPES.TEXTAREA]: { rows: 4 },
      [COMPONENT_TYPES.NUMBER]: { min: 0, max: 100, step: 1 },
      [COMPONENT_TYPES.SWITCH]: { checkedText: '开', uncheckedText: '关' },
    };

    return { ...base, ...(typeConfig[type] || {}) };
  }

  static validateSchema(schema) {
    if (!schema.fields || !Array.isArray(schema.fields)) return false;
    return schema.fields.every(f => f.id && f.type && f.label);
  }

  static exportSchema(schema) {
    return JSON.stringify(schema, null, 2);
  }

  static importSchema(jsonString) {
    try {
      const schema = JSON.parse(jsonString);
      return this.validateSchema(schema) ? schema : null;
    } catch {
      return null;
    }
  }
}

// ==================== 组件面板 ====================
function ComponentPalette({ onAddComponent }) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Wrench className="w-5 h-5" />
        组件库
      </h2>
      <div className="space-y-2">
        {DEFAULT_COMPONENTS.map((comp) => (
          <button
            key={comp.type}
            onClick={() => onAddComponent(comp.type)}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex items-center gap-3"
          >
            <span className="text-2xl">{comp.icon}</span>
            <span className="font-medium">{comp.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ==================== 画布 ====================
function Canvas({ schema, selectedId, onSelect, onDelete, onReorder }) {
  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex !== dropIndex) {
      onReorder(dragIndex, dropIndex);
    }
  };

  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">{schema.title || '未命名表单'}</h2>
        {schema.description && (
          <p className="text-gray-600 mb-6">{schema.description}</p>
        )}

        {schema.fields.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center text-gray-400">
            从左侧拖入组件开始设计表单
          </div>
        ) : (
          <div className="space-y-4">
            {schema.fields.map((field, index) => (
              <div
                key={field.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onClick={() => onSelect(field.id)}
                className={`p-4 border-2 rounded-lg cursor-move transition-all ${selectedId === field.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-400'
                  }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <label className="font-medium flex items-center gap-2">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(field.id);
                    }}
                    className="text-red-500 hover:text-red-700 px-2 py-1 text-sm"
                  >
                    删除
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  类型: {DEFAULT_COMPONENTS.find(c => c.type === field.type)?.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== 属性编辑器 ====================
function PropertyEditor({ schema, selectedField, onUpdateSchema, onUpdateField }) {
  if (!selectedField) {
    return (
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
        <h2 className="text-lg font-bold mb-4">表单属性</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">表单标题</label>
            <input
              type="text"
              value={schema.title || ''}
              onChange={(e) => onUpdateSchema({ title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="请输入表单标题"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">表单描述</label>
            <textarea
              value={schema.description || ''}
              onChange={(e) => onUpdateSchema({ description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={3}
              placeholder="请输入表单描述"
            />
          </div>
        </div>
      </div>
    );
  }

  const renderFieldProperties = () => {
    const commonProps = (
      <>
        <div>
          <label className="block text-sm font-medium mb-1">字段标签</label>
          <input
            type="text"
            value={selectedField.label}
            onChange={(e) => onUpdateField({ label: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">占位符</label>
          <input
            type="text"
            value={selectedField.placeholder || ''}
            onChange={(e) => onUpdateField({ placeholder: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedField.required}
            onChange={(e) => onUpdateField({ required: e.target.checked })}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium">必填字段</label>
        </div>
      </>
    );

    const typeSpecificProps = {
      [COMPONENT_TYPES.TEXTAREA]: (
        <div>
          <label className="block text-sm font-medium mb-1">行数</label>
          <input
            type="number"
            value={selectedField.rows || 4}
            onChange={(e) => onUpdateField({ rows: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            min={2}
            max={20}
          />
        </div>
      ),
      [COMPONENT_TYPES.NUMBER]: (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">最小值</label>
            <input
              type="number"
              value={selectedField.min ?? ''}
              onChange={(e) => onUpdateField({ min: e.target.value ? parseFloat(e.target.value) : undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">最大值</label>
            <input
              type="number"
              value={selectedField.max ?? ''}
              onChange={(e) => onUpdateField({ max: e.target.value ? parseFloat(e.target.value) : undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">步长</label>
            <input
              type="number"
              value={selectedField.step || 1}
              onChange={(e) => onUpdateField({ step: parseFloat(e.target.value) || 1 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </>
      ),
      [COMPONENT_TYPES.SWITCH]: (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">开启文本</label>
            <input
              type="text"
              value={selectedField.checkedText || '开'}
              onChange={(e) => onUpdateField({ checkedText: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">关闭文本</label>
            <input
              type="text"
              value={selectedField.uncheckedText || '关'}
              onChange={(e) => onUpdateField({ uncheckedText: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </>
      ),
    };

    const hasOptions = [COMPONENT_TYPES.SELECT, COMPONENT_TYPES.RADIO, COMPONENT_TYPES.CHECKBOX].includes(selectedField.type);

    return (
      <>
        {commonProps}
        {typeSpecificProps[selectedField.type]}
        {hasOptions && (
          <div>
            <label className="block text-sm font-medium mb-2">选项配置</label>
            {selectedField.options?.map((opt, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={opt.label}
                  onChange={(e) => {
                    const newOpts = [...selectedField.options];
                    newOpts[idx].label = e.target.value;
                    onUpdateField({ options: newOpts });
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="选项文本"
                />
                <button
                  onClick={() => {
                    const newOpts = selectedField.options.filter((_, i) => i !== idx);
                    onUpdateField({ options: newOpts });
                  }}
                  className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  删除
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newOpts = [...(selectedField.options || []), { label: `选项${(selectedField.options?.length || 0) + 1}`, value: `opt${(selectedField.options?.length || 0) + 1}` }];
                onUpdateField({ options: newOpts });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              + 添加选项
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">字段属性</h2>
      <div className="space-y-4">
        {renderFieldProperties()}
      </div>
    </div>
  );
}

// ==================== 表单渲染器 ====================
function FormRenderer({ schema }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    schema.fields.forEach(field => {
      if (field.required) {
        const value = formData[field.id];
        if (!value || (Array.isArray(value) && value.length === 0)) {
          newErrors[field.id] = '此字段为必填项';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('表单数据:', formData);
      alert('表单提交成功!查看控制台输出');
    } else {
      alert('请填写所有必填字段');
    }
  };

  const renderField = (field) => {
    const commonProps = {
      id: field.id,
      required: field.required,
      placeholder: field.placeholder,
      className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors[field.id] ? 'border-red-500' : 'border-gray-300'
        }`,
    };

    switch (field.type) {
      case COMPONENT_TYPES.INPUT:
        return <input {...commonProps} type="text" value={formData[field.id] || ''} onChange={(e) => handleChange(field.id, e.target.value)} />;

      case COMPONENT_TYPES.TEXTAREA:
        return <textarea {...commonProps} rows={field.rows || 4} value={formData[field.id] || ''} onChange={(e) => handleChange(field.id, e.target.value)} />;

      case COMPONENT_TYPES.NUMBER:
        return <input {...commonProps} type="number" min={field.min} max={field.max} step={field.step} value={formData[field.id] || ''} onChange={(e) => handleChange(field.id, e.target.value)} />;

      case COMPONENT_TYPES.DATE:
        return <input {...commonProps} type="date" value={formData[field.id] || ''} onChange={(e) => handleChange(field.id, e.target.value)} />;

      case COMPONENT_TYPES.SELECT:
        return (
          <select {...commonProps} value={formData[field.id] || ''} onChange={(e) => handleChange(field.id, e.target.value)}>
            <option value="">请选择</option>
            {field.options?.map((opt, idx) => (
              <option key={idx} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );

      case COMPONENT_TYPES.RADIO:
        return (
          <div className="space-y-2">
            {field.options?.map((opt, idx) => (
              <label key={idx} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name={field.id} value={opt.value} checked={formData[field.id] === opt.value} onChange={(e) => handleChange(field.id, e.target.value)} className="w-4 h-4" />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case COMPONENT_TYPES.CHECKBOX:
        return (
          <div className="space-y-2">
            {field.options?.map((opt, idx) => (
              <label key={idx} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" value={opt.value} checked={(formData[field.id] || []).includes(opt.value)} onChange={(e) => {
                  const current = formData[field.id] || [];
                  const newValue = e.target.checked ? [...current, opt.value] : current.filter(v => v !== opt.value);
                  handleChange(field.id, newValue);
                }} className="w-4 h-4" />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case COMPONENT_TYPES.SWITCH:
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input type="checkbox" checked={formData[field.id] || false} onChange={(e) => handleChange(field.id, e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            </div>
            <span className="text-sm">{formData[field.id] ? field.checkedText : field.uncheckedText}</span>
          </label>
        );

      default:
        return <input {...commonProps} type="text" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">{schema.title || '表单预览'}</h2>
      {schema.description && <p className="text-gray-600 mb-6">{schema.description}</p>}

      <div className="space-y-6">
        {schema.fields.map(field => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block font-medium mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
            )}
          </div>
        ))}

        {schema.fields.length > 0 && (
          <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium">
            提交表单
          </button>
        )}
      </div>
    </div>
  );
}

// ==================== 主应用 ====================
export default function FormDesigner() {
  const [schema, setSchema] = useState({
    title: '我的表单',
    description: '',
    fields: [],
  });
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [mode, setMode] = useState('design'); // design | preview | code

  const selectedField = schema.fields.find(f => f.id === selectedFieldId);

  const handleAddComponent = (type) => {
    const id = `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newField = SchemaManager.createField(type, id);
    setSchema(prev => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));
    setSelectedFieldId(id);
  };

  const handleDeleteField = (id) => {
    setSchema(prev => ({
      ...prev,
      fields: prev.fields.filter(f => f.id !== id),
    }));
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  const handleReorderFields = (fromIndex, toIndex) => {
    setSchema(prev => {
      const newFields = [...prev.fields];
      const [moved] = newFields.splice(fromIndex, 1);
      newFields.splice(toIndex, 0, moved);
      return { ...prev, fields: newFields };
    });
  };

  const handleUpdateSchema = (updates) => {
    setSchema(prev => ({ ...prev, ...updates }));
  };

  const handleUpdateField = (updates) => {
    setSchema(prev => ({
      ...prev,
      fields: prev.fields.map(f =>
        f.id === selectedFieldId ? { ...f, ...updates } : f
      ),
    }));
  };

  const handleSave = () => {
    const json = SchemaManager.exportSchema(schema);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `form_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoad = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imported = SchemaManager.importSchema(event.target.result);
          if (imported) {
            setSchema(imported);
            setSelectedFieldId(null);
            alert('导入成功!');
          } else {
            alert('导入失败:文件格式错误');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* 顶部工具栏 */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">表单设计器 v1.0</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('design')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${mode === 'design' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <Wrench className="w-4 h-4" />
            设计
          </button>
          <button
            onClick={() => setMode('preview')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${mode === 'preview' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <Eye className="w-4 h-4" />
            预览
          </button>
          <button
            onClick={() => setMode('code')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${mode === 'code' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <Code className="w-4 h-4" />
            代码
          </button>
          <div className="w-px h-8 bg-gray-300 mx-2"></div>
          <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
            <Save className="w-4 h-4" />
            保存
          </button>
          <button onClick={handleLoad} className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors">
            <FolderOpen className="w-4 h-4" />
            加载
          </button>
        </div>
      </header>

      {/* 主内容区 */}
      <div className="flex-1 flex overflow-hidden">
        {mode === 'design' && (
          <>
            <ComponentPalette onAddComponent={handleAddComponent} />
            <Canvas
              schema={schema}
              selectedId={selectedFieldId}
              onSelect={setSelectedFieldId}
              onDelete={handleDeleteField}
              onReorder={handleReorderFields}
            />
            <PropertyEditor
              schema={schema}
              selectedField={selectedField}
              onUpdateSchema={handleUpdateSchema}
              onUpdateField={handleUpdateField}
            />
          </>
        )}

        {mode === 'preview' && (
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <FormRenderer schema={schema} />
          </div>
        )}

        {mode === 'code' && (
          <div className="flex-1 overflow-y-auto bg-gray-900 text-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Form Schema (JSON)</h3>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(SchemaManager.exportSchema(schema));
                  alert('已复制到剪贴板!');
                }}
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-sm"
              >
                复制代码
              </button>
            </div>
            <pre className="text-sm font-mono whitespace-pre-wrap">{SchemaManager.exportSchema(schema)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}