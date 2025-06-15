import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const OverviewStats = ({ rooms }) => {
    const isToday = (date) => {
        const today = new Date();
        const checkDate = new Date(date);
        return (
            checkDate.getDate() === today.getDate() &&
            checkDate.getMonth() === today.getMonth() &&
            checkDate.getFullYear() === today.getFullYear()
        );
    };

    const isDateInRange = (date, startDate, endDate) => {
        const checkDate = new Date(date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return checkDate >= start && checkDate <= end;
    };

    const today = new Date(); 
    let checkIns = 0;
    let checkOuts = 0;
    let totalInHotel = 0;

    rooms.forEach((room) => {
        room.reservations.forEach((reservation) => {
            if (reservation.reservation_status === "Confirmed") {
                if (isToday(reservation.check_in_date)) {
                    checkIns++;
                }

                if (isToday(reservation.check_out_date)) {
                    checkOuts++;
                }

                if (
                    isDateInRange(
                        today,
                        reservation.check_in_date,
                        reservation.check_out_date
                    )
                ) {
                    totalInHotel++;
                }
            }
        });
    });

    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter((room) => room.room_status === "Occupied").length;
    const availableRooms = totalRooms - occupiedRooms;

    return (
        <div className="overview">
            <h2>Overview</h2>
            <div className="overview-grid">
                <div className="overview-card">
                    <div className="text">
                        <h4>Today's</h4>
                        <h5>Check-in</h5>
                    </div>
                    <p>{checkIns}</p>
                </div>
                <div className="overview-card">
                    <div className="text">
                        <h4>Today's</h4>
                        <h5>Check-out</h5>
                    </div>
                    <p>{checkOuts}</p>
                </div>
                <div className="overview-card">
                    <div className="text">
                        <h4>Total</h4>
                        <h5>In Hotel</h5>
                    </div>
                    <p>{totalInHotel}</p>
                </div>
                <div className="overview-card">
                    <div className="text">
                        <h4>Total</h4>
                        <h5>Available Rooms</h5>
                    </div>
                    <p>{availableRooms}</p>
                </div>
                <div className="overview-card">
                    <div className="text">
                        <h4>Total</h4>
                        <h5>Occupied Rooms</h5>
                    </div>
                    <p>{occupiedRooms}</p>
                </div>
            </div>
        </div>
    );
};

const RoomCard = ({ room, rooms }) => {
    const occupiedRoomsCount = rooms.filter(r => r.room_type.room_type_name === room.room_type.room_type_name && 
        r.reservations.some(reservation => reservation.reservation_status === "Confirmed")).length;
    const Availability = rooms.filter(r => r.room_type.room_type_name === room.room_type.room_type_name && 
        !r.reservations.some(reservation => reservation.reservation_status === "Confirmed")).length;

    return (
        <div className="room-card">
            <span className="deal-tag">{occupiedRoomsCount} Deals</span>
            <h3>{room.room_type.room_type_name}</h3>
            <p>Max Occupancy: {room.max_occupancy}</p>
            <p>Availability: {Availability}</p>
            <p className="price">${room.price_per_night} / day</p>
        </div>
    );
};

const RoomList = ({ rooms }) => {
    const uniqueRooms = rooms.filter((room, index, self) =>
        index === self.findIndex((r) => r.room_type.room_type_name === room.room_type.room_type_name)
    );

    return (
        <div className="card-container">
            <h2>Rooms</h2>
            <div>
                {uniqueRooms.map((room, index) => (
                    <RoomCard key={index} room={room} rooms={rooms} />
                ))}
            </div>
        </div>
    );
};

const RoomStatus = ({ rooms }) => {
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(room => room.room_status === "Occupied").length;
    const availableRooms = totalRooms - occupiedRooms;

    const CompletedMaintenance = rooms.filter(room => 
        room.room_maintenance && room.room_maintenance.maintenance_status === "Completed"
    ).length;
    
    const PendingMaintenance = rooms.filter(room => 
        room.room_maintenance && room.room_maintenance.maintenance_status === "Pending"
    ).length;
    
    const InProgressMaintenance = rooms.filter(room => 
        room.room_maintenance && room.room_maintenance.maintenance_status === "In Progress"
    ).length;
    return (
        <div className="room-status">
            <h3>Room Status</h3>
            <div className="status-grid">
                <div>
                    <h4>Occupied Rooms</h4>
                    <p>Total: {occupiedRooms}</p>
                    <p>Completed: {CompletedMaintenance}</p>
                    <p>Pending: {PendingMaintenance}</p>
                    <p>In Progress: {InProgressMaintenance}</p>
                </div>
                <div>
                    <h4>Available Rooms</h4>
                    <p>Total: {availableRooms}</p>
                    <p>Completed: {CompletedMaintenance}</p>
                    <p>Pending: {PendingMaintenance}</p>
                    <p>In Progress: {InProgressMaintenance}</p>
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            console.log("Fetching room data...");
            try {
                const response = await axios.get("/rooms");
                console.log("Fetched rooms data:", response.data);
                setRooms(response.data);
            } catch (err) {
                console.error("Error fetching room data:", err);
                setError("Failed to fetch room data.");
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(room => room.room_status === "Occupied")
    .length;

    const occupiedPercentage = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;

    const monthlyData = Array(12).fill(0);
    rooms.forEach(room => {
        room.reservations.forEach(reservation => {
            if (reservation.reservation_status === "Confirmed") {
                const month = new Date(reservation.check_in_date).getMonth();
                monthlyData[month] += 1;
            }
        });
    });

    const columnOptions = {
        chart: { type: "bar" },
        plotOptions: {
            bar: { horizontal: false, columnWidth: "55%" }
        },
        dataLabels: { enabled: true },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        fill: { colors: ["#3b82f6"] }
    };

    const columnSeries = [{ name: "Occupied Rooms", data: monthlyData }];

    // Define options for the radial bar chart
    const options = {
        chart: { type: "radialBar" },
        plotOptions: {
            radialBar: {
                hollow: { size: "60%" },
                startAngle: -90,
                endAngle: 90,
                track: { background: "#E5E7EB" },
                dataLabels: {
                    name: { show: false },
                    value: {
                        fontSize: "24px",
                        show: true,
                        formatter: val => `${Math.round(val)}%`
                    }
                }
            }
        },
        fill: { colors: ["#3b82f6"] },
        // labels: ["Occupied"]
    };


    // Define series data for the radial bar chart
    const series = [occupiedPercentage];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (totalRooms === 0) return <div>No rooms available.</div>;

    return (
        <div>
            <OverviewStats rooms={rooms} />
            <RoomList rooms={rooms} />
            <div className="chart-container">
                <div className="chart">
                    <h3>Room Occupancy</h3>
                    <Chart options={options} series={series} type="radialBar" height={300} />
                    <div className="legend">
                        <p className="f"><span className="blue"></span>Occupied</p>
                        <p><span className="green"></span>Available</p>
                    </div>
                </div>
                <div className="chart">
                    <h3>Monthly Occupancy</h3>
                    <Chart options={columnOptions} series={columnSeries} type="bar" height={250} />
                </div>
                
            </div>
            <div className="container2">
                <RoomStatus rooms={rooms} />    
            </div>
            
        </div>
    );
};

export default Dashboard;
