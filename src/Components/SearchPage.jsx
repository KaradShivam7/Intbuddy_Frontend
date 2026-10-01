import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../axiosConfig";

function SearchPage() {

    const location = useLocation();

    const keyword = new URLSearchParams(location.search).get("keyword");

    const [results, setResults] = useState([]);
    const [openId, setOpenId] = useState(null);

       useEffect(() => {

    if(keyword){
        fetchData();
    }

}, [keyword]);

    const fetchData = async () => {

    try {

        const response = await api.get(
            `/Experiance/search?keyword=${keyword}`
        );

        setResults(response.data);

    } catch (err) {

        console.log(err);

        setResults([]);

    }

};

    return (

           <div
    className="container mt-5 pt-5"
    style={{ maxWidth: "900px" }}
>

            <h2 className="mb-4 fw-bold">
    Search Results for "{keyword}"
</h2>

            {results.length === 0 && (
    <h5 className="text-center mt-5">
        No Experience Found
    </h5>
)}

            {
                <div className="row">

  {results.map((item) => (

    <div className="col-12 mb-4" key={item.experiance_ID}>

      <div className="card shadow-sm border-0">

        <div className="card-body">

          <div className="d-flex justify-content-between">

            <div>

              <h4 className="fw-bold text-primary">
                {item.companyName}
              </h4>

              <h6 className="text-dark">
                {item.position}
              </h6>

              <p className="text-secondary mb-1">
                <strong>Role :</strong> {item.role}
              </p>

              <p className="text-secondary mb-1">
                <strong>Experience :</strong> {item.experianceinyear}
              </p>

              <p className="text-secondary mb-1">
                <strong>Candidate :</strong> {item.fullName}
              </p>
              {item.resumeName && (
    <div className="mt-3">

        <p className="mb-2">
            <strong>Resume :</strong> {item.resumeName}
        </p>

        <a
            href={`http://localhost:9090/Experiance/resume/${item.experiance_ID}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-danger"
        >
            Download Resume
        </a>

    </div>
)}

               <button
    className="btn btn-warning mt-3"
    onClick={() =>
        setOpenId(
            openId === item.experiance_ID
                ? null
                : item.experiance_ID
        )
    }
>
    {openId === item.experiance_ID
        ? "Hide Experience"
        : "View Experience"}
</button>
                          

                          {openId === item.experiance_ID && (

    <div className="mt-4 p-3 border rounded bg-light">

        <h5 className="fw-bold mb-3">
            Interview Questions
        </h5>

        <hr />

        <p style={{ whiteSpace: "pre-line" }}>
            {item.details}
        </p>

    </div>

)}

            </div>

          </div>

        </div>

      </div>

    </div>

  ))}

</div>
            }

        </div>

    );

}

export default SearchPage;