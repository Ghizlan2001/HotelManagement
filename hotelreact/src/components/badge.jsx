const Badge=({children})=>{
    const badgeStyles = {
        "Available": { backgroundColor: "#E6F9E6", color: "#27AE60", padding: "6px 12px", borderRadius: "15px", fontSize: "14px", fontWeight: "500", textAlign: "center" },
        "Occupied": { backgroundColor: "#FCE6E6", color: "#EB5757", padding: "6px 12px", borderRadius: "15px", fontSize: "14px", fontWeight: "500", textAlign: "center" },
        "Maintenance": { backgroundColor: "#FFF6E0", color: "#F2994A", padding: "6px 12px", borderRadius: "15px", fontSize: "14px", fontWeight: "500", textAlign: "center" },
        "Confirmed": { backgroundColor: "#E6F9E6", color: "#27AE60", padding: "6px 12px", borderRadius: "15px", fontSize: "14px", fontWeight: "500", textAlign: "center" },
        "Cancelled": { backgroundColor: "#F2F2F2", color: "#828282", padding: "6px 12px", borderRadius: "15px", fontSize: "14px", fontWeight: "500", textAlign: "center" },
        "Paid": { backgroundColor: "#E6F9E6", color: "#27AE60", padding: "6px 12px", borderRadius: "15px", fontSize: "14px", fontWeight: "500", textAlign: "center" },
        "Pending": { backgroundColor: "#E0F4FF", color: "#2F80ED", padding: "6px 12px", borderRadius: "15px", fontSize: "14px", fontWeight: "500", textAlign: "center" },
        "Refunded": { backgroundColor: "#FCE6E6", color: "#EB5757", padding: "6px 12px", borderRadius: "15px", fontSize: "14px", fontWeight: "500", textAlign: "center" },
        "In Progress": { backgroundColor: "#FFF6E0", color: "#F2994A", padding: "6px 12px", borderRadius: "15px", fontSize: "14px", fontWeight: "500", textAlign: "center" },
        "Completed": { backgroundColor: "#E6F9E6", color: "#27AE60", padding: "6px 12px", borderRadius: "15px", fontSize: "14px", fontWeight: "500", textAlign: "center" },
    };
    return(
        <div>
            <span style={children ? badgeStyles[children] : { backgroundColor: "#F2F2F2", color: "#828282", padding: "6px 12px", borderRadius: "15px", fontSize: "14px", fontWeight: "500", textAlign: "center" }}>{children}</span>
        </div>
    );
}
export default Badge;