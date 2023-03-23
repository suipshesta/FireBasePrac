import React,{useState,useEffect} from 'react'
import './_fireStore.scss'
import firebase from '../../firebaseConfig/config'


const FireStoreCrud = () => {
    
    const [aFirstName,setAFirstName]=useState("")
    const [aLastName,setALastName]=useState("")
    const [userData,setUserData]=useState([])
    const [uFirstName,setUFirstName]=useState("")
    const [uLastName,setULastName]=useState("")
    const [userId,setUserId]=useState('')

    const handleAddUser=(e)=>{
        e.preventDefault();
        const fireStore=firebase.firestore().collection("UserInfo");
        let data={
            FirstName:aFirstName,
            LastName:aLastName,
        }
        fireStore.add(data)
        setAFirstName("")
        setALastName("")
        
    }
    const handleUpdateUser=(e)=>{
        e.preventDefault();
        const fireStore=firebase.firestore().collection("UserInfo").doc(userId);
        fireStore.update({
            FirstName:uFirstName,
            LastName:uLastName,
        })
        setUFirstName("")
        setULastName("")

        
    }
    const handleDelete=(id)=>{
        const fireStore=firebase.firestore().collection("UserInfo").doc(id);
        fireStore.delete()
    }
    const handleClick=(data)=>{
        setUFirstName(data.FirstName);
        setULastName(data.LastName);
        setUserId(data.id)
    }


    useEffect(() => {
        const firestore=firebase.firestore().collection("UserInfo")
        firestore.onSnapshot((snapshot)=>{
            const userInfo=snapshot.docs.map(doc=>({
                id:doc.id,...doc.data()
            }))
           
            setUserData(userInfo)
        })
      
    }, [])

    return (
        <>
        <h1>CRUD form with FireStore </h1>
        <div className='home-container-form2'>
            <form className='home-container-form2-add'>
                <div className='home-container-form2-add-1'>
                    <label>First Name</label>
                    <input 
                    type='text' 
                    value={aFirstName} 
                    onChange={(e)=>{setAFirstName(e.target.value)}}
                    />
                </div>
               
               <div className='home-container-form2-add-2'>
                  <label>Last Name</label>
                    <input 
                    type='text'
                    value={aLastName} 
                    onChange={(e)=>{setALastName(e.target.value)}}
                    />
               </div>
               
                <button onClick={(e)=>{handleAddUser(e)}}>add</button>
            </form>

            <form className='home-container-form2-update'>
                {/* <h2>update</h2> */}
                <div className='home-container-form2-update-1'>
                    <label>First Name</label>
                    <input 
                    type='text' 
                    value={uFirstName} 
                    onChange={(e)=>{setUFirstName(e.target.value)}}
                    />
                </div>
               
               <div className='home-container-form2-update-2'>
                  <label>Last Name</label>
                    <input 
                    type='text'
                    value={uLastName} 
                    onChange={(e)=>{setULastName(e.target.value)}}
                    />
               </div>
               
                <button onClick={(e)=>{handleUpdateUser(e)}}>update</button>
            </form>
            
        </div>
        <div className='home-container-datass'>
            {userData.length==0?
            (
                <div className='home-container-datass-empty'>
                    database is empty.Add some data first
                </div>
            )
            :
            (
              <table className='home-container-datass-present'>
                  <tr className='home-container-datass-present-top'>
                      <th>firstName</th>
                      <th>LastName</th>
                  </tr>
                  {userData.map((data,index)=>(
                      <tr key={index} className='home-container-datass-present-bottom'>
                          
                          <th>{data.FirstName}</th>
                          <th>{data.LastName}</th>
                          <button onClick={()=>{handleClick(data)}}>edit</button>
                          <button onClick={()=>{handleDelete(data.id)}}>delete</button>
                      </tr>
                  ))}
              </table>
            )
            }
        </div>
        </>
    )

}

export default FireStoreCrud
