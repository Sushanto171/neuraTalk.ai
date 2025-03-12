import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
let loading = true;
const ContentArea = ({ isNewChat, loading: load = true }) => {
  const { chats, isLoading } = useSelector((state) => state.chats);
  const messageEndRef = useRef(null);
  useEffect(() => {
    loading = load;
  }, [loading]);

  useEffect(() => {
    messageEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);
  return (
    <div
      className={`flex-1 overflow-auto p-4 rounded-lg border border-gray-300 dark:border-gray-950 shadow-md ${
        chats?.length > 0 ? "h-full" : ""
      }`}
    >
      {isNewChat ? (
        <>
          <div>
            <h1 className="text-center text-3xl">How can I assist you?</h1>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-4 overflow-x-auto rounded-lg">
            <ul>
              {chats.length === 0 ? (
                <div>
                  {loading || isLoading ? (
                    <h2>Loading....</h2>
                  ) : (
                    <h1 className="text-center text-3xl">
                      How can I assist you?
                    </h1>
                  )}
                </div>
              ) : (
                <>
                  {chats.map((chat, index) => (
                    <li key={index} className="flex flex-col space-y-2 mt-4">
                      {/* User Query */}
                      <div className="flex justify-end ">
                        <div className="prose lg:prose-lg dark:prose-invert bg-blue-500 p-2 rounded-lg shadow-md">
                          <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            remarkPlugins={[remarkGfm]}
                          >
                            {chat?.prompt}
                          </ReactMarkdown>
                        </div>
                      </div>
                      {/* Timestamp */}
                      <div className="text-xs text-right">
                        {chat.createAt &&
                          new Date(chat.createAt).toLocaleTimeString()}
                      </div>
                      {/* AI Response */}
                      <div className="flex justify-start overflow-x-auto rounded-lg">
                        <div className="prose lg:prose-lg dark:prose-invert rounded-lg shadow-md p-2">
                          <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            remarkPlugins={[remarkGfm]}
                          >
                            {chat?.response}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
            <div ref={messageEndRef}></div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentArea;
