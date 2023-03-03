import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { db } from "../../../firebase/firebase-config";
import formatter from "../../../FormatVND";

function OrderUser() {
    let userID = useSelector((state) => state.user.userID);
    let [order, setOrder] = useState([]);

    useEffect(() => {
        getOrder();
    }, [userID]);

    const getOrder = async () => {
        let orders = [];
        await getDocs(collection(db, "orders"))
            .then((data) => {
                data.docs.forEach((doc) => {
                    orders.push({ ...doc.data(), id: doc.id });                   
                });
            })
            .catch((err) => {
                console.log(err.message);
            })
        let orderID = orders.filter((ord) => ord.idU === userID);
        setOrder(orderID);
    }
    
    const handleDeleteOrder = (id) => {
        deleteDoc(doc(db, "orders", id));
        toast.success("Hủy đơn thành công.")
    }

    return ( 
        <>
            {order.length > 0 ? (
                order?.map((ord, index) => (
                    <div key={index}>
                        <div className="order-heading">
                            <div>
                                <h6 style={{color: 'black'}}>{ord.name} - {ord.phone}</h6>
                                <h6 style={{color: 'black'}}>Ngày đặt: {ord.orderDate} {"->"} Ngày giao: {ord.deliveryDate}</h6>
                                <h6 style={{color: 'green'}}>Địa chỉ: {ord.address}</h6>
                                <h6>Trạng thái: {ord.status}</h6>
                            </div>
                            <Button onClick={() => handleDeleteOrder(ord.id)} variant={"danger"} className="h-50">Hủy đơn</Button>
                        </div>
                        <Table className="mb-4" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>ID</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ord.cart?.map((c,index) => (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{c.id}</td>
                                        <td>{c.name}</td>
                                        <td>{formatter.format(c.price)}</td>
                                        <td>3</td>
                                        <td className="fw-bold">{formatter.format(c.price * c.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ))
            ) : (
                <h3 className="pct">Bạn chưa có đơn hàng nào.</h3>
            )
            }
            {}

            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Bông cải baby (500g)</td>
                        <td>{formatter.format(129000)}</td>
                        <td>3</td>
                        <td className="fw-bold">{formatter.format(129000 * 3)}</td>
                        <td>Đang vận chuyển</td>
                    </tr>
                </tbody>
            </Table> */}
        </>     
    );
}

export default OrderUser;