export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "userName",
    headerName: "user name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.image}
            alt={params.row.userName}
          />
          {params.row.userName}
        </div>
      );
    },
  },
  {
    field: "firstName",
    headerName: "firstName",
    width: 230,
  },
  {
    field: "lastName",
    headerName: "lastName",
    width: 230,
  },
  {
    field: "email",
    headerName: "email",
    width: 230,
  },
];

export const userRows = [
  {
    id: 123456,
    userName: "john_doe",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    address: "123 Main St, City, Country",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    id: 654327,
    userName: "alice_smith",
    firstName: "Alice",
    lastName: "Smith",
    email: "alicesmith@example.com",
    address: "456 Elm St, City, Country",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    id: 987654,
    userName: "sam_wilson",
    firstName: "Sam",
    lastName: "Wilson",
    email: "samwilson@example.com",
    address: "789 Oak St, City, Country",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    id: 246813,
    userName: "lucy_brown",
    firstName: "Lucy",
    lastName: "Brown",
    email: "lucybrown@example.com",
    address: "321 Pine St, City, Country",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    id: 135792,
    userName: "michael_jones",
    firstName: "Michael",
    lastName: "Jones",
    email: "michaeljones@example.com",
    address: "654 Cedar St, City, Country",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    id: 369258,
    userName: "emily_taylor",
    firstName: "Emily",
    lastName: "Taylor",
    email: "emilytaylor@example.com",
    address: "987 Walnut St, City, Country",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    id: 987123,
    userName: "david_clark",
    firstName: "David",
    lastName: "Clark",
    email: "davidclark@example.com",
    address: "246 Maple St, City, Country",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    id: 258741,
    userName: "olivia_hall",
    firstName: "Olivia",
    lastName: "Hall",
    email: "oliviahall@example.com",
    address: "579 Birch St, City, Country",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    id: 123789,
    userName: "william_lee",
    firstName: "William",
    lastName: "Lee",
    email: "williamlee@example.com",
    address: "135 Cherry St, City, Country",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    id: 987432,
    userName: "sophia_miller",
    firstName: "Sophia",
    lastName: "Miller",
    email: "sophiamiller@example.com",
    address: "864 Pine St, City, Country",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    id: 654987,
    userName: "james_harris",
    firstName: "James",
    lastName: "Harris",
    email: "jamesharris@example.com",
    address: "297 Elm St, City, Country",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    id: 321654,
    userName: "ava_thompson",
    firstName: "Ava",
    lastName: "Thompson",
    email: "avathompson@example.com",
    address: "630 Oak St, City, Country",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    id: 987456,
    userName: "benjamin_king",
    firstName: "Benjamin",
    lastName: "King",
    email: "benjaminking@example.com",
    address: "951 Walnut St, City, Country",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    id: 654321,
    userName: "mia_young",
    firstName: "Mia",
    lastName: "Young",
    email: "miayoung@example.com",
    address: "284 Maple St",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
];
