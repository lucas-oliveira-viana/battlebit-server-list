import { useEffect, useState } from "react";
import { TFilterConfig, TPagination } from "./types";

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

function useFilter<T>(data: T[], configs: TFilterConfig[]) {
    const [state, setState] = useState<{ [key: string]: string }>();
    const [filteredData, setFilteredData] = useState<T[]>([]);

    useEffect(() => {
        setFilteredData(data)
    }, [data])

    useEffect(() => {
        if (state) {
            let filteredServerData = data;

            Object.entries(state).forEach(([name, value]) => {
                const currFilterConfigs = configs.find(config => config.name === name);

                filteredServerData = filteredServerData.filter((paramData: any) => {
                    const filterConfig = currFilterConfigs.options && currFilterConfigs.options.find(currFilterConfig => currFilterConfig.value === value);

                    if (filterConfig && filterConfig.criteria && filterConfig.tableColumnParam) {
                        return filterConfig.criteria(paramData[filterConfig.tableColumnParam])
                    }

                    const dataValue = paramData[name]?.toString().toLowerCase() || '';
                    const filterValue = value.toString().toLowerCase();

                    return dataValue.includes(filterValue);
                });
            });

            setFilteredData(filteredServerData);

            return;
        }

        setFilteredData(data);
    }, [state]);

    return { filter: state, setFilter: setState, filteredData, setFilteredData };
}

export { usePagination, useFilter };