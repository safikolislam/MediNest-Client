
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Report = () => {
 
  const { data: orders, isLoading, isError, error } = useQuery({
    queryKey: ['all-orders'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/admin/all-orders`);
      return data;
    },
    staleTime: 60000,
  });


  const columns = [
    { name: 'User Name', selector: row => row.userName, sortable: true },
    { name: 'User Email', selector: row => row.userEmail, sortable: true },
    { name: 'Transaction ID', selector: row => row.transactionId, grow: 2 },
    { name: 'Total Price', selector: row => `$${row.totalPrice.toFixed(2)}`, sortable: true },
    { name: 'Status', selector: row => row.status, sortable: true },
    { name: 'Timestamp', selector: row => new Date(row.timestamp || row.createdAt).toLocaleString(), sortable: true },
  ];

 
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Medinest All Orders Report', 14, 20);

    const tableData = orders?.map(order => [
      order.userName,
      order.userEmail,
      order.transactionId,
      `$${order.totalPrice.toFixed(2)}`,
      order.status,
      new Date(order.timestamp || order.createdAt).toLocaleString(),
    ]) || [];

    autoTable(doc, {
      startY: 25,
      head: [['User Name', 'User Email', 'Transaction ID', 'Total Price', 'Status', 'Timestamp']],
      body: tableData,
    });

    doc.save('all-orders-report.pdf');
  };


  const exportToCSV = () => {
    const headers = ['User Name','User Email','Transaction ID','Total Price','Status','Timestamp'];
    const csv = [
      headers.join(','),
      ...orders?.map(order => [
        `"${order.userName}"`,
        `"${order.userEmail}"`,
        `"${order.transactionId}"`,
        order.totalPrice.toFixed(2),
        order.status,
        `"${new Date(order.timestamp || order.createdAt).toLocaleString()}"`
      ].join(',')) || []
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'all-orders-report.csv';
    link.click();
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <title>Sales Report || Medinest</title>
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">All Orders Report</h2>

        <div className="mb-6 flex gap-2">
          <button onClick={exportToPDF} className="px-4 py-2 bg-red-600 text-white rounded">Export to PDF</button>
          <button onClick={exportToCSV} className="px-4 py-2 bg-green-600 text-white rounded">Export to CSV</button>
        </div>

        <DataTable
          columns={columns}
          data={orders}
          pagination
          highlightOnHover
          pointerOnHover
          customStyles={{
            headCells: { style: { fontSize:'14px', fontWeight:'bold', backgroundColor:'#f3f4f6' } }
          }}
        />
      </div>
    </div>
  );
};

export default Report;




