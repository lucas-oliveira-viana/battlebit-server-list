import React, { useEffect, useState } from 'react';
import Table from './components/molecules/Table';
import { TServer, TServerResponse } from './common/types';
import { useFilter, usePagination } from './common/hooks';
import Pagination from './components/molecules/Pagination';
import Filters from './components/molecules/Filters';
import { COLUMN_CONFIG, FILTER_CONFIG, INITIAL_PAGINATION_CONFIG } from './common/config';
import { fetchServers } from './common/api';
import Loading from './assets/loading.svg';
import Icon from './assets/icon.png';
import Background from './assets/bg.jpg';
import GitHubLogo from './assets/github.png';

function App() {
  const [servers, setServers] = useState<TServer[]>([]);
  const { pagination, setPaginationData, setCurrentPage } = usePagination<TServer>(
    INITIAL_PAGINATION_CONFIG,
  );
  const {
    filter,
    setFilter,
    filteredData: filteredServers,
  } = useFilter<TServer>(servers, FILTER_CONFIG);

  useEffect(() => {
    const getServers = async () => {
      const response = await fetchServers();

      const handledValue = handleServersResponseValue(response);

      setServers(handledValue);
    };

    getServers();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [filter]);

  useEffect(() => {
    setPaginationData(filteredServers);
  }, [filteredServers]);

  function handleServersResponseValue(servers: TServerResponse[]) {
    return servers.map((server) => ({
      ...server,
      Players: `${server.Players}/${server.MaxPlayers} [${server.QueuePlayers}]`,
    }));
  }

  return (
    <div className="bg-black h-100 min-h-screen">
      <div
        className={`h-100 min-h-screen overflow-auto`}
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
        <header className="bg-zinc-800 h-20 flex justify-start items-center pl-12">
          <img src={Icon} className="w-10 h-10 mr-4" />
          <span className="text-white text-xl font-bold">BATTLEBIT SERVER LIST</span>
        </header>
        <section className="min-w-full text-center mt-4">
          {servers.length ? (
            <div className="pl-12 pr-12 pb-12">
              {pagination.paginatedData && (
                <div className="flex flex-col gap-6">
                  <Filters
                    filters={filter}
                    setFilters={setFilter}
                    fields={FILTER_CONFIG}
                  />
                  <div className="overflow-auto rounded-lg">
                    <Table
                      columns={COLUMN_CONFIG}
                      data={pagination.paginatedData[pagination.currentPage]}
                    ></Table>
                  </div>

                  <Pagination pagination={pagination} setCurrentPage={setCurrentPage} />
                </div>
              )}
            </div>
          ) : (
            <div className="min-w-full flex justify-center pt-6">
              <Loading className="w-16 h-16 animate-spin" />
            </div>
          )}
        </section>
      </div>
      <footer className="bg-black p-12">
        <h2 className="text-zinc-300 font-bold mb-2 text-xl">
          About BattleBit Server List
        </h2>
        <p className="text-zinc-300 mb-2">
          BattleBit Server List is a website for players to check the server status while
          they are outside of the game using{' '}
          <a
            className="font-bold underline underline-offset-2 hover:text-zinc-400"
            target="_blank"
            href="https://publicapi.battlebit.cloud/Servers/GetServerList"
          >
            BattleBit Servers Public API.
          </a>
        </p>
        <div className="flex gap-2 items-center">
          <img src={GitHubLogo} className="w-6 h-6" />
          <a
            href="https://github.com/lucas-oliveira-viana/battlebit-server-list"
            target="_blank"
            className="text-zinc-300 hover:text-zinc-400 font-bold underline underline-offset-2"
          >
            https://github.com/lucas-oliveira-viana/battlebit-server-list
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
