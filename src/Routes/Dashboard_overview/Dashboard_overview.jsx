import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import 'tailwindcss/tailwind.css';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard_overview() {
    const axiosSecure = useAxiosSecure();

    const { data: status_count } = useQuery({
        queryKey: ['status_count'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/get-count-payment-status');
            return data;
        }
    })

    console.log(status_count);

    const unpaid = status_count?.total - status_count?.delivered;

    parseInt(unpaid)


    const barChartData = {
        labels: ['Processing', 'Shipping', 'Delivered'],
        datasets: [
            {
                label: 'Orders by Status',
                data: [status_count?.processing, status_count?.shipping, status_count?.delivered], // Hardcoded data
                backgroundColor: ['#4CAF50', '#FFC107', '#00BCD4'],
                borderColor: ['#388E3C', '#FFA000', '#0097A7'],
                borderWidth: 1,
            },
        ],
    };

    const pieChartData = {
        labels: ['Paid', 'Unpaid'],
        datasets: [
            {
                data: [status_count?.delivered, unpaid], // Hardcoded data
                backgroundColor: ['#4CAF50', '#FF5722'],
                hoverBackgroundColor: ['#388E3C', '#D32F2F'],
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Order Status Overview',
            },
        },
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Payment Status Distribution',
            },
        },
    };

    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen font-poppins">
            {/* Heading and Subheading */}
            <header className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-gray-800">Order Management</h1>
                <p className="text-gray-600">Track and analyze your orders' status and payment details</p>
                <p>This data it working on (COD) method so that the delivered cash will counted as paid</p>
            </header>

            {/* Responsive Chart Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Bar Chart for Order Status */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Orders by Status</h2>
                    <Bar data={barChartData} options={barChartOptions} />
                </div>

                {/* Pie Chart for Payment Status */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Payment Status</h2>
                    <Pie data={pieChartData} options={pieChartOptions} />
                </div>
            </section>

            {/* Responsive Table */}
            <section className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Order List</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                status_count?.allPayments?.map((payment, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment?.transactionId?.slice(0, 15)}..</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment?.userName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment?.status}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${payment?.paid}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment?.status === 'delivered' ? 'Paid' : 'Unpaid'}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
