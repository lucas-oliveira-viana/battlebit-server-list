import { useState } from "react";
import { TPagination } from "./types";

function usePagination<T>(initialState: TPagination<T>) {
    const [state, setState] = useState<TPagination<T>>(initialState);

    function setPaginationData(data: T[]) {

        const chunkedArray: T[][] = [];
        for (let i = 0; i < data.length; i += state.pageSize) {
            chunkedArray.push(data.slice(i, i + state.pageSize));
        }

        setState(currState => ({
            ...currState,
            paginatedData: chunkedArray,
            totalPages: chunkedArray.length
        }))
    }

    function setCurrentPage(page: number) {
        setState(currState => ({
            ...currState,
            currentPage: page
        }))
    }

    return { pagination: state, setPaginationData, setCurrentPage };
}

export { usePagination };