import { useEffect, useState } from "react";
import InfiniteScroll from "./components/InfiniteScroll";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [pageNumber, setPageNumber] = useState(1);

  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    fetchData(pageNumber)
  }, [pageNumber])

  const fetchData = async (page) => {
    try {
      if (!hasMoreData || loading) return;
      setLoading(true);
      setError(false);
      let resp = await fetch(
        `https://openlibrary.org/search.json?q=page=${page}&limit=${100}`,
      );
      if (!resp.ok) {
        throw new Error("Response is not ok");
      }
      resp = await resp.json();
      setData((prev) => [...prev, ...resp.docs]);
      setHasMoreData(resp.docs.length > 0);
      console.log("resp ", resp);
    } catch (err) {
      console.err("Error", err);
      setError("Something went wrong, try again");
    } finally {
      setLoading(false);
    }
  };

  const loadData = () => {
    setPageNumber(prev => prev + 1);
  }

  return (
    <div className="app">
      <InfiniteScroll
        data={data}
        loadData={loadData}
        hasMoreData={hasMoreData}
        loading={loading}
        error={error}
        renderItem={(item) => <ItemCard item={item} />}
      />
    </div>
  );
}

const ItemCard = (props) => {
  const { item } = props;
  return <div 
    style={{
      border: "1px solid grey",
      borderRadius: "8px",
      padding: "10px"
    }}
  >{item.title}</div>;
};
