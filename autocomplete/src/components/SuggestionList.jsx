import React from "react";

const SuggestionList = (props) => {
  const { data, error, isLoading, onClick, activeIndex, query} = props;

  if (isLoading && query) {
    return <div className="center">Loading...</div>;
  }
  if (query && error) {
    return <div className="center">{error.message}</div>;
  }
  if (query && (!data || data?.length === 0) && !isLoading) {
    return <div className="center">No Results</div>;
  }

  const handleClick = (item) => {
    onClick(item.name);
  };
  return (
    <ul>
      {data?.map((item, index) => (
        <li 
        className={`${index === activeIndex ? 'active': ''}`}
        key={item.id} onClick={() => handleClick(item)}>
          {item?.name}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionList;
