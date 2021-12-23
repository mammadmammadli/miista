import { FC } from "react";
import styles from "./styles.module.css";

type Props = {
  pages: number;
  currentPage: number;
  onClick: (page: number) => void;
};

export const Pagination: FC<Props> = ({ pages, currentPage, onClick }) => {
  const renderContent = () => {
    let maxShow = pages - currentPage > 5 ? 5 : pages - currentPage;

    // for (let i = pages - 2; i < pages; i++) {
    //   content.push(
    //     <div
    //       className={`${styles.paginationItem} ${
    //         currentPage === i ? styles.paginationActiveItem : ""
    //       }`}
    //       onClick={() => onClick(i)}
    //     >
    //       {i + currentPage + 1}
    //     </div>
    //   );
    // }
    // if (pages - 5 > currentPage || true) {
    //   for (let i = currentPage - 1; i <= currentPage; i++) {
    //     if (i !== 0 && i !== 1) {
    //       content.push(
    //         <div
    //           className={`${styles.paginationItem} ${
    //             currentPage === i ? styles.paginationActiveItem : ""
    //           }`}
    //           onClick={() => onClick(i)}
    //         >
    //           {i}
    //         </div>
    //       );
    //     }
    //   }
    // } else {
    //   for (let i = pages - 6; i <= pages - 1; i++) {
    //     content.push(
    //       <div
    //         className={`${styles.paginationItem} ${
    //           currentPage === i ? styles.paginationActiveItem : ""
    //         }`}
    //         onClick={() => onClick(i)}
    //       >
    //         {i}
    //       </div>
    //     );
    //   }
    // }
  };

  return (
    <div className="flex justify-center py-4">
      <div
        className={`${styles.paginationItem} ${
          currentPage === 1 ? styles.paginationActiveItem : ""
        }`}
        onClick={() => onClick(1)}
      >
        {1}
      </div>
      {currentPage - 1 > 1 && (
        <div
          className={`${styles.paginationItem} ${
            currentPage === 1 ? styles.paginationActiveItem : ""
          }`}
          onClick={() => onClick(currentPage - 1)}
        >
          {currentPage - 1}
        </div>
      )}
      {currentPage !== 1 && currentPage !== pages && (
        <div
          className={`${styles.paginationItem} ${styles.paginationActiveItem}`}
          onClick={() => onClick(1)}
        >
          {currentPage}
        </div>
      )}
      {currentPage + 1 < pages && (
        <div
          className={`${styles.paginationItem} ${
            currentPage === pages - 1 ? styles.paginationActiveItem : ""
          }`}
          onClick={() => onClick(currentPage + 1)}
        >
          {currentPage + 1}
        </div>
      )}
      {pages !== 1 && (
        <div
          className={`${styles.paginationItem} ${
            currentPage === pages ? styles.paginationActiveItem : ""
          }`}
          onClick={() => onClick(pages)}
        >
          {pages}
        </div>
      )}
    </div>
  );
};
