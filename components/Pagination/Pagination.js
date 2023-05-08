import ReactPaginate from "react-paginate";
import RightArrow from "../../assets/Svg/RightArrow";
import LeftArrow from "../../assets/Svg/LeftArrow";

const Pagination = ({ handlePaginationChange, pageCount, initialPage }) => {
  return (
    <div className="z-10">
      <ReactPaginate
        previousLabel={<RightArrow />}
        nextLabel={<LeftArrow />}
        onPageChange={handlePaginationChange}
        marginPagesDisplayed={0}
        pageRangeDisplayed={-1}
        pageCount={pageCount}
        initialPage={initialPage}
        disabledClassName={"text-[#5C696E99]"}
        containerClassName={
          "pagination flex gap-[10px] items-center font-medium text-[14px] leading-[18px] text-[#5C696E99]"
        }
        activeClassName={"active text-[#5C696E]"}
      />
    </div>
  );
};

export default Pagination;
