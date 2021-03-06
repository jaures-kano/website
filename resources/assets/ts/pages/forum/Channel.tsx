import React from "react";
import { usePage } from "@inertiajs/inertia-react";

import Layout from "@/includes/Layout";
import Seo from "@/includes/Seo";

import Pagination from "@/components/Pagination";

import Header from "@/components/forum/Header";
import TabBar from "@/components/forum/TabBar";
import SearchBar from "@/components/forum/SearchBar";
import Sidebar from "@/components/forum/Sidebar";
import ListChannels from "@/pages/forum/ListChannels";
import Thread from "@/components/forum/Thread";

import { ThreadType } from "@/utils/types";

const Channel = () => {
  const { channel, threads } = usePage();
  const { data, links } = threads;
  return (
    <>
      <Seo
        title="Forum"
        description="Les forums communautaires sont un endroit pour discuter de tout ce qui concerne le développement / le design (UI et UX)."
      />
      <Header />
      <div className="container mt-12">
        <ListChannels />
        <div className="flex w-full">
          <Sidebar />
          <div className="w-full lg:pl-12 lg:w-9/12">
            <div className="flex items-center space-x-4 lg:space-x-0">
              <div className="w-full lg:w-2/3 items-center">
                <div className="hidden lg:inline-flex bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 mr-4 rounded-lg items-center">
                  <span
                    className={`block h-3 w-3 rounded-full bg-brand-${channel.slug} mr-2`}
                  />
                  {channel.name}
                </div>
                <TabBar />
              </div>
              <div className="w-full lg:w-1/3">
                <SearchBar />
              </div>
            </div>
            <div className="my-10">
              {data.length === 0 && (
                <div className="w-full flex items-center justify-center">
                  <img
                    src={require("@/assets/images/no-data.svg")}
                    className="mx-auto w-100"
                    alt="No data"
                  />
                </div>
              )}
              {data.map((thread: ThreadType) => (
                <Thread key={thread.id} {...thread} />
              ))}
            </div>
            <Pagination links={links} />
          </div>
        </div>
      </div>
    </>
  );
};

Channel.layout = (page: React.ReactNode) => <Layout child={page} />;

export default Channel;
