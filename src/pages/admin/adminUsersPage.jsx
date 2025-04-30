import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
      if (loading) {
        setUsers();   //
      }
  }, [loading]);

  function handleBlockUser (email) {
    const token = localStorage.getItem("token");

    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(()=>{
        setLoading(true);
    }).catch((err)=>{
        console.log(err);
    })
  }

  return (
    <div className="p-6 min-h-screen bg-background text-text">
      <h1 className="text-3xl font-heading font-bold mb-6 text-accent">
        Admin Users
      </h1>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-muted">Loading users...</span>
        </div>
      ) : users.length === 0 ? (
        <p className="text-center text-muted">No users found.</p>
      ) : (
        <div className="overflow-x-auto bg-surface rounded-xl shadow-soft border border-border">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-secondary text-accent">
              <tr>
                {["Profile", "Name", "Email", "Role", "Phone", "Address", "Status"].map((heading) => (
                  <th key={heading} className="py-3 px-4 text-left text-xl font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-secondary transition">
                  <td className="py-3 px-4">
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">{user.firstName} {user.lastName}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                  <td className="py-3 px-4">{user.phone}</td>
                  <td className="py-3 px-4">{user.address}</td>
                  <td onClick={()=>{handleBlockUser(user.email)}} className="py-3 px-4 cursor-pointer">{user.isBlocked?"Blocked":"Active"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}






// import axios from "axios";
// import { useEffect, useState } from "react"

// export default function AdminUsersPage () {
//     const [users, setUsers] = useState([]);             // particular array (users maintain array list) maintain state and loading state we need as useState ok
//     const [loading, setLoading] = useState(true);

//     useEffect (()=>{            // when page is loading we need hook called as useEffect hook, getting users from backend ok
//         if (loading) {
//             const token = localStorage.getItem("token");        // firstly we need token in local storage ok
//             axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`,{
//                 headers : {
//                     Authorization : `Bearer ${token}`       //backend to frontend
//                 }
//             }
//             ).then((res) => {      // I have received users data
//                 console.log(res.data);
//                 setUsers(res.data);         // set the date to users
//                 setLoading(false);      
//             }).catch((err) => {
//                 console.log(err);
//                 setLoading(false);      
//             })
//         }
//     },[loading]);               //useEffect will run when loading changes. depending on loading we will do something
//     return (
//         <div>
//             <h1>Admin Users Page</h1>
//         </div>
//     )
// }