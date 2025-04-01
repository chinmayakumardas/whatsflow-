'use client'
import { useState } from 'react';

import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Image,
  FileText,
  Video,
  Eye
} from 'lucide-react';

const TemplateList = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: 'Welcome Message',
      type: 'text',
      status: 'Active',
      language: 'English',
      lastModified: '2025-03-17'
    },
    {
      id: 2,
      title: 'Promotional Offer',
      type: 'media',
      status: 'Active',
      language: 'English',
      lastModified: '2025-03-16'
    },
    {
      id: 3,
      title: 'Order Confirmation',
      type: 'text',
      status: 'Inactive',
      language: 'Spanish',
      lastModified: '2025-03-15'
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    language: 'all'
  });

  const handleAddTemplate = (newTemplate) => {
    setTemplates([...templates, { ...newTemplate, id: templates.length + 1 }]);
    setShowModal(false);
  };

  const handleEditTemplate = (updatedTemplate) => {
    setTemplates(templates.map(template => 
      template.id === updatedTemplate.id ? updatedTemplate : template
    ));
    setShowModal(false);
    setSelectedTemplate(null);
  };

  const handleDeleteTemplate = (templateId) => {
    setTemplates(templates.filter(template => template.id !== templateId));
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || template.status === filters.status;
    const matchesType = filters.type === 'all' || template.type === filters.type;
    const matchesLanguage = filters.language === 'all' || template.language === filters.language;
    
    return matchesSearch && matchesStatus && matchesType && matchesLanguage;
  });

  const getTemplateTypeIcon = (type) => {
    switch (type) {
      case 'text':
        return <FileText size={18} />;
      case 'media':
        return <Image size={18} />;
      case 'video':
        return <Video size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  return (
   
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Message Templates</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Create Template
          </button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 relative">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border "
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 rounded-lg border "
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-3 py-2 rounded-lg border "
          >
            <option value="all">All Types</option>
            <option value="text">Text</option>
            <option value="media">Media</option>
            <option value="video">Video</option>
          </select>
          <select
            value={filters.language}
            onChange={(e) => setFilters({ ...filters, language: e.target.value })}
            className="px-3 py-2 rounded-lg border "
          >
            <option value="all">All Languages</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white  rounded-lg shadow-sm p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getTemplateTypeIcon(template.type)}
                  <h3 className="font-medium">{template.title}</h3>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  template.status === 'Active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {template.status}
                </span>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Language: {template.language}</p>
                <p>Last Modified: {template.lastModified}</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedTemplate(template)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <button
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  <Eye size={18} className="mr-1" />
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Template Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white  rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">
                {selectedTemplate ? 'Edit Template' : 'Create New Template'}
              </h2>
              <TemplateForm
                template={selectedTemplate}
                onSubmit={selectedTemplate ? handleEditTemplate : handleAddTemplate}
                onCancel={() => {
                  setShowModal(false);
                  setSelectedTemplate(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
   
  );
};

const TemplateForm = ({ template, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: template?.title || '',
    type: template?.type || 'text',
    status: template?.status || 'Active',
    language: template?.language || 'English',
    content: template?.content || '',
    media: template?.media || null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...template,
      ...formData,
      lastModified: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700  mb-1">
          Template Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg "
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700  mb-1">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg "
          >
            <option value="text">Text</option>
            <option value="media">Media</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700  mb-1">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg "
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg "
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700  mb-1">
          Content
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={6}
          className="w-full px-3 py-2 border rounded-lg "
          required
        />
      </div>

      {formData.type !== 'text' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Media
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg dark:border-gray-700">
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>Upload a file</span>
                  <input type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 dark:text-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {template ? 'Update' : 'Create'} Template
        </button>
      </div>
    </form>
  );
};

export default TemplateList;
