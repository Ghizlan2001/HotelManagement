import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const RoomCard = ({ room, rooms }) => {
    // Calculate the number of occupied rooms for this room type
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
    // Extract unique room types
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
    const occupiedRooms = rooms.filter(room =>
        room.reservations.some(reservation => reservation.reservation_status === "Confirmed")
    ).length;
    const availableRooms = totalRooms - occupiedRooms;

    const cleanRooms = rooms.filter(room => room.status === "Clean").length;
    const dirtyRooms = rooms.filter(room => room.status === "Dirty").length;
    const inspectedRooms = rooms.filter(room => room.status === "Inspected").length;

    return (
        <div className="room-status">
            <h3>Room Status</h3>
            <div className="status-grid">
                <div>
                    <h4>Occupied Rooms</h4>
                    <p>Total: {occupiedRooms}</p>
                    <p>Clean: {cleanRooms}</p>
                    <p>Dirty: {dirtyRooms}</p>
                    <p>Inspected: {inspectedRooms}</p>
                </div>
                <div>
                    <h4>Available Rooms</h4>
                    <p>Total: {availableRooms}</p>
                    <p>Clean: {cleanRooms}</p>
                    <p>Dirty: {dirtyRooms}</p>
                    <p>Inspected: {inspectedRooms}</p>
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
    const occupiedRooms = rooms.filter(room =>
        room.reservations.some(reservation => reservation.reservation_status === "Confirmed")
    ).length;

    const occupiedPercentage = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;

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
        labels: ["Occupied"]
    };

    const series = [occupiedPercentage];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (totalRooms === 0) return <div>No rooms available.</div>;

    return (
        <div>
            <div>
                <RoomList rooms={rooms} />
            </div>
            <div className="chart-container">
            <div className="chart">
                <h3>Room Occupancy</h3>
                <Chart options={options} series={series} type="radialBar" height={200} />
                <div className="legend">
                    <p className="f"><span className="blue"></span>Occupied</p>
                    <p><span className="green"></span>Available</p>
                </div>
            </div>
            <RoomStatus rooms={rooms} />
            </div>
        </div>
    );
};

export default Dashboard;