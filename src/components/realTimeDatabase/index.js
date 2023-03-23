import React,{useState,useEffect} from 'react'
import './_realtimeDatabaseForm.scss'
import firebase from '../../firebaseConfig/config'


const RealTimeDataBaseCrud= () => {
    
    const [aFirstName,setAFirstName]=useState("")
    const [aLastName,setALastName]=useState("")
    const [userData,setUserData]=useState([])
    const [uFirstName,setUFirstName]=useState("")
    const [uLastName,setULastName]=useState("")
    const [userId,setUserId]=useState('')

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const handleAddUser=(e)=>{
        e.preventDefault();
        const fireStore=firebase.database().ref("/UserInfo");
        let data={
            FirstName:aFirstName,
            LastName:aLastName,
        }
        fireStore.push(data)
        setAFirstName("")
        setALastName("")
        
    }
    const handleUpdateUser=(e)=>{
        e.preventDefault();
        const fireStore=firebase.database().ref("/UserInfo").child(userId);
        fireStore.update({
            FirstName:uFirstName,
            LastName:uLastName,
        })
        setUFirstName("")
        setULastName("")

        
    }
    const handleDelete=(id)=>{
        const fireStore=firebase.database().ref("/UserInfo").child(id);
        fireStore.remove()
    }
    const handleClick=(data)=>{
        setUFirstName(data.FirstName);
        setULastName(data.LastName);
        setUserId(data.id)
    }
    const handleImgChange = e => {
        // if (e.target.files[0]) {
          setImage(e.target.files[0]);
          console.log('img:',image)
        // }
      }
      const handleImgUpload = () => {
        const uploadTask=firebase.storage().ref("images").child(image.name).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          error => {
            console.log(error);
          },
          () => {
            firebase
              .storage()
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                  console.log(url)
                setUrl(url);
              });
          }
        );
      }
     
    useEffect(() => {
        const firestore=firebase.database().ref('/UserInfo')
        firestore.on('value',(response)=>{
            const data=response.val()
            let userInfo=[]
            for(let id in data){
                userInfo.push({
                    id:id,
                    FirstName:data[id].FirstName,
                    LastName:data[id].LastName,
                })
            }
            setUserData(userInfo)
        })
      
    }, [])

    return (
        <>
        <h1>CRUD form with Firebase Realtime Database </h1>
        <div className='home-container-form1'>
            <form className='home-container-form1-add'>
                <div className='home-container-form1-add-1'>
                    <label>First Name</label>
                    <input 
                    type='text' 
                    value={aFirstName} 
                    onChange={(e)=>{setAFirstName(e.target.value)}}
                    />
                </div>
               
               <div className='home-container-form1-add-2'>
                  <label>Last Name</label>
                    <input 
                    type='text'
                    value={aLastName} 
                    onChange={(e)=>{setALastName(e.target.value)}}
                    />
               </div>

               <div>
                    <progress value={progress} max="100" />
                      <br />
                    <input type="file" onChange={(e)=>{ handleImgChange(e) }} />
                    <button onClick={()=>{ handleImgUpload() }}>Upload</button>
                    <br />
                    {url}
                    <br />
                    <img src={url || "http://via.placeholder.com/300"} alt= "firebase image"/>
                </div>
               
                <button onClick={(e)=>{handleAddUser(e)}}>add</button>
            </form>

            <form className='home-container-form1-update'>
                {/* <h2>update</h2> */}
                <div className='home-container-form1-update-1'>
                    <label>First Name</label>
                    <input 
                    type='text' 
                    value={uFirstName} 
                    onChange={(e)=>{setUFirstName(e.target.value)}}
                    />
                </div>
               
               <div className='home-container-form1-update-2'>
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
        <div className='home-container-datas'>
            {userData.length==0?
            (
                <div className='home-container-datas-empty'>
                    database is empty.Add some data first
                </div>
            )
            :
            (
              <table className='home-container-datas-present'>
                  <tr className='home-container-datas-present-top'>
                      <th>firstName</th>
                      <th>LastName</th>
                  </tr>
                  {userData.map((data,index)=>(
                      <tr key={index} className='home-container-datas-present-bottom'>
                          
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

export default RealTimeDataBaseCrud
