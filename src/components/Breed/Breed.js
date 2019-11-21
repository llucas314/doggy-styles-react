import React, { Component } from "react";
import "./Breed.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import BreedProfile from "../Breed_Profile/BreedProfile";

export default class Breed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breeds: this.props.breeds,
      dogBreed: "",
      isLoaded: false
    };
    this.loadDog = this.loadDog.bind(this);
  }
  loadDog = () => {
    this.props.breeds.forEach(breed => {
      if (breed.name === this.props.match.params.id) {
        this.setState({ breeds: breed }, () => {
          axios
            .get(
              `https://api.thedogapi.com/v1/images/search?breed_ids=${breed.id}&api_key=22ea4027-cfc1-464e-89c4-aed63db671ad`
            )
            .then(res => this.setState({ dogBreed: res.data[0] }))
            .then(this.setState({ isLoaded: true }))
            .catch(err => console.log(err));
        });
      }
    });
  };
  componentDidMount() {
    this.loadDog();
    // console.log(currentBreed);
    // this.loadDog();
    // this.props.breeds.forEach(breed => {
    //   if (breed.name === this.props.match.params.id) {
    //     this.setState({ breeds: breed });
    //     axios
    //       .get(
    //         `https://api.thedogapi.com/v1/images/search?breed_ids=${breed.id}&api_key=22ea4027-cfc1-464e-89c4-aed63db671ad`
    //       )
    //       .then(res => this.setState({ dogBreed: res.data[0] }))
    //       .then(this.setState({ isLoaded: true }))
    //       .catch(err => console.log(err));
    //   }
    // });
  }

  render() {
    const currentBreed = this.props.breeds.filter(
      breed => breed.name === this.props.match.params.id
    );

    console.log(currentBreed);

    return (
      <div className="breed-page">
        <Header login={true} />
        <Breadcrumbs links={["Search", "Breeds"]} />
        <main>
          <BreedProfile {...currentBreed[0]} url={this.state.dogBreed.url} />
          <div className="link-wrap">
            <Link to="/search" className="breed-link">
              Back to Search
            </Link>{" "}
            |{" "}
            <Link
              to={`/search/results/${currentBreed.name}`}
              className="breed-link"
            >
              {" "}
              See Dogs With Similar Styles
            </Link>
          </div>
        </main>
      </div>
    );
  }
}

// import React, { useState, useEffect } from "react";
// import "./Breed.css";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Header from "../Header/Header";
// import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
// import BreedProfile from "../Breed_Profile/BreedProfile";

// export default function Breed(props) {
//   const [imgUrl, setImgUrl] = useState("");
//   //  const [isLoaded,setIsLoaded] = useState(false)
//   const currentBreed = props.breeds.filter(
//     breed => breed.name === props.match.params.id
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios(
//         `https://api.thedogapi.com/v1/images/search?breed_ids=${currentBreed.id}&api_key=22ea4027-cfc1-464e-89c4-aed63db671ad`
//       );
//       // .then(res => setImgUrl(res.data[0].url))
//       // // .then(setIsLoaded(true))
//       // .catch(err => console.log(err));
//       if (result !== "") {
//         setImgUrl(result);
//       }
//     };
//     fetchData();
//   });

//   return (
//     <main className="breed-page">
//       <Header login={true} />
//       <Breadcrumbs links={["Search", "Breeds"]} />{" "}
//       <main>
//         <BreedProfile {...currentBreed[0]} url={imgUrl} />
//         <div className="link-wrap">
//           <Link to="/search" className="breed-link">
//             Back to Search
//           </Link>{" "}
//           |{" "}
//           <Link
//             to={`/search/results/${currentBreed.name}`}
//             className="breed-link"
//           >
//             {" "}
//             See Dogs With Similar Styles
//           </Link>
//         </div>
//       </main>
//     </main>
//   );
// }
