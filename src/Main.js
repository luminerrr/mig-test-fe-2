import './main.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Main(){
    const [customerList, setCustomerList] = useState([]);
    const [filterStatus, setFilterStatus] = useState(false);

    useEffect(()=>{

    }, [customerList])

    function getCustomer(e){
        e.preventDefault();
        const customerUrl = "https://mitramas-test.herokuapp.com/customers";
        axios.get(customerUrl, {
            headers: {
                authorization: process.env.REACT_APP_SECRET_CODE
            }
        }).then((response)=>{
            setCustomerList(response.data.data);
        }).catch((err)=>{
            console.log('error occured', err);
        })
    }

    function clearCustomer(e){
        e.preventDefault();
        setCustomerList([]);
    }

    function filterOnClick(e){
        if(filterStatus === false){
            setFilterStatus(true)
            filterHandler(e)
        }
        else{
            setFilterStatus(false)
            filterHandler(e)
        }
    }

    function filterHandler(e){
            setCustomerList(getCustomer(e))
            const filtered = customerList.filter(customer=>{
                return customer.status === filterStatus;
            })
            setCustomerList(filtered);
        
        
    }

    return(
        <>
        <div>
            <button onClick={(e)=>getCustomer(e)}>
            Get all Customer
            </button>
            <button onClick={(e)=>clearCustomer(e)}>
                Clear all customer
            </button>
            <button onClick={(e)=>filterOnClick(e)}>
                Filter by status
            </button>
            <p>Current filter status : {filterStatus.toString()}</p>
            <div>
            
                {
                customerList.map((customer)=>(
                    <div> 
                        <p>id : {customer.id}</p>
                        <p>name : {customer.name}</p>
                        <p>address : {customer.address}</p>
                        <p>country : {customer.country}</p>
                        <p>status : {customer.status.toString()}</p>
                    </div>
                    
                ))}
            </div>
        </div>
        </>
    )
}

export default Main;