import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = ['All', 'Matched', 'Mismatch', 'Pending', 'Review']

  const tableData = [
    {
      soNumber: 'HOU-510714',
      poNumber: '61431',
      customer: 'Anvil Innovations',
      vendor: 'AVIVA METALS, INC.',
      date: '2025-07-25',
      material: 'Bronze Diameter Hollow C86300 Manganese Bronze CON...',
      quantity: '1 PCS',
      value: '$300.00',
      status: 'Mismatch',
      validationScore: 65
    },
    {
      soNumber: 'HOU-510715',
      poNumber: '61432',
      customer: 'Tech Solutions Ltd',
      vendor: 'METAL SUPPLY CO.',
      date: '2025-07-25',
      material: 'Aluminum Sheet 6061-T6 0.125" x 48" x 96"',
      quantity: '2 PCS',
      value: '$450.00',
      status: 'Matched',
      validationScore: 98
    },
    {
      soNumber: 'HOU-510716',
      poNumber: '61433',
      customer: 'Industrial Parts',
      vendor: 'STEEL WORKS INC.',
      date: '2025-07-25',
      material: 'Stainless Steel Round Bar 316L 1" Diameter',
      quantity: '5 PCS',
      value: '$750.00',
      status: 'Mismatch',
      validationScore: 72
    },
    {
      soNumber: 'HOU-510717',
      poNumber: '61434',
      customer: 'Precision Manufacturing',
      vendor: 'QUALITY METALS LLC',
      date: '2025-07-25',
      material: 'Copper Sheet C11000 0.062" x 24" x 48"',
      quantity: '3 PCS',
      value: '$520.00',
      status: 'Matched',
      validationScore: 96
    },
    {
      soNumber: 'HOU-510718',
      poNumber: '61435',
      customer: 'Advanced Components',
      vendor: 'METALCRAFT INDUSTRIES',
      date: '2025-07-25',
      material: 'Titanium Grade 2 Round Bar 0.5" Diameter',
      quantity: '1 PCS',
      value: '$1,200.00',
      status: 'Matched',
      validationScore: 100
    },
    {
      soNumber: 'HOU-510719',
      poNumber: '61436',
      customer: 'Custom Fabrication',
      vendor: 'SPECIALTY METALS CORP.',
      date: '2025-07-25',
      material: 'Inconel 625 Round Bar 0.75" Diameter',
      quantity: '2 PCS',
      value: '$850.00',
      status: 'Review',
      validationScore: 45
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Matched':
        return 'bg-green-500 text-white'
      case 'Mismatch':
        return 'bg-red-500 text-white'
      case 'Review':
        return 'bg-orange-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Matched':
        return '✓'
      case 'Mismatch':
        return '✕'
      case 'Review':
        return '!'
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SO/PO Comparison
          </h1>
          <p className="text-gray-600">
            Review and compare Sales Orders with Purchase Orders
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by SO/PO number, customer, or material..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SO Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PO Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer/Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Material
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Validation Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approval
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.soNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.poNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{row.customer}</div>
                        <div className="text-sm text-gray-500">{row.vendor}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {row.material}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                        <span className="mr-1">{getStatusIcon(row.status)}</span>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${row.validationScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{row.validationScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                          <span className="mr-1">✓</span>
                          Approve
                        </button>
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                          <span className="mr-1">✕</span>
                          Reject
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        Compare
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
