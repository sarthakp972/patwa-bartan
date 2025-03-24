// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
// import { ref, onValue } from "firebase/database";
// import { realtimeDB } from "../FirebaseConfig"; // Import your Firebase config
// import "../Css-page/MeetCreators.css";

// const MeetCreators = () => {
//   const [creators, setCreators] = useState([]);
//   const [loading, setLoading] = useState(true); // Track loading state

//   // Fetch data from Firebase
//   useEffect(() => {
//     const creatorsRef = ref(realtimeDB, "creators"); // Reference to 'creators' node in Firebase

//     onValue(
//       creatorsRef,
//       (snapshot) => {
//         if (snapshot.exists()) {
//           const data = snapshot.val();
//           const creatorsArray = Object.values(data).filter(
//             (creator) => creator.img && creator.img.trim() !== ""
//           ); // Ensure only creators with valid images

//           setCreators(creatorsArray);
//         } else {
//           console.log("No data available");
//           setCreators([]); // Ensure creators list is empty if no valid data
//         }
//         setLoading(false); // Data fetching completed
//       },
//       {
//         onlyOnce: true, // Fetch data once to avoid unnecessary re-renders
//       }
//     );
//   }, []);

//   return (
//     <div className="meet-creators-section">
//       <Container>
//         <h2 className="text-center">Meet Our Creators</h2>
//         <h3 className="text-center">Faces Behind Patwa Bartan Bhandar</h3>

//         {/* Show spinner while data is loading */}
//         {loading ? (
//           <div className="text-center my-4">
//             <Spinner animation="grow" variant="primary" size="lg" />
//           </div>
//         ) : creators.length === 0 ? (
//           <p className="text-center">No creators available.</p>
//         ) : (
//           creators.reduce((rows, creator, index) => {
//             if (index % 3 === 0) rows.push([]); // Create a new row every 3 items
//             rows[rows.length - 1].push(creator);
//             return rows;
//           }, []).map((row, rowIndex) => (
//             <Row key={rowIndex} className="mb-4">
//               {row.map((creator, colIndex) => (
//                 <Col md={4} sm={6} xs={12} key={colIndex}>
//                   <Card className="creator-card">
//                     <Card.Img variant="top" src={creator.img} className="creator-img" />
//                     <Card.Body>
//                       {creator.name && <h4>{creator.name}</h4>}
//                       {creator.desc && <p>{creator.desc}</p>}
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           ))
//         )}
//       </Container>
//     </div>
//   );
// };

// export default MeetCreators;
