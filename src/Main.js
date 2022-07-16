import './main.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Main(){
    const [customerList, setCustomerList] = useState([]);
    const [filterStatus, setFilterStatus] = useState(false);
    const [token, setToken] = useState()

    useEffect(()=>{

    }, [customerList, token])

    function getCustomer(e){
        e.preventDefault();
        const customerUrl = "https://mitramas-test.herokuapp.com/customers";
        axios.get(customerUrl, {
            headers: {
                authorization: JSON.parse(token)
            }
        }).then((response)=>{
            setCustomerList(response.data.data);
            console.log(token)
        }).catch((err)=>{
            console.log('error occured', err);
            console.log(token)
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

    function postLogin(e){
        e.preventDefault()
        var data = JSON.stringify({
            "email": "akun17@mig.id",
            "password": "21EBDDE5"
          });
          
        var config = {
            method: 'post',
            url: 'https://mitramas-test.herokuapp.com/auth/login',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
          
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data.access_token));
            setToken(JSON.stringify(response.data.access_token))
        })
        .catch(function (error) {
            console.log(error);
          });
        }

    return(
        <>
        <div>
            <p>If can't get the customer, click the login first</p>
            <button onClick={(e)=>getCustomer(e)}>
                Get all Customer
            </button>
            <button onClick={(e)=>clearCustomer(e)}>
                Clear all customer
            </button>
            <button onClick={(e)=>filterOnClick(e)}>
                Filter by status
            </button>
            <button onClick={(e)=>postLogin(e)}>
                Login
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