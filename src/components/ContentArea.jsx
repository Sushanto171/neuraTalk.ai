import { useSelector } from "react-redux";

// Function to dynamically format bold and italic text
const formatText = (text) => {
  // Handle bold (**text**) and italic (*text*)
  let formattedText = text;

  // Replace **bold** with <strong> tags
  formattedText = formattedText.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );

  // Replace *italic* with <em> tags
  formattedText = formattedText.replace(/\*(.*?)\*/g, "<em>$1</em>");

  return formattedText;
};

const ContentArea = ({ isNewChat }) => {
  const { chats } = useSelector((state) => state.chats);

  // console.log(chats);
  return (
    <div
      className={`flex-1 overflow-auto p-4 bg-gray-100 rounded-lg border border-gray-300 shadow-md ${
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
          <div className="space-y-4">
            <ul>
              {chats.length === 0 ? (
                <div>
                  <h1 className="text-center text-3xl">
                    How can I assist you?
                  </h1>
                </div>
              ) : (
                <>
                  {chats.map((chat, index) => (
                    <li key={index} className="flex flex-col space-y-2">
                      {/* User Query */}
                      <div className="flex justify-end">
                        <p className="bg-blue-500 text-white p-2 rounded-lg max-w-2/3">
                          {formatText(chat.prompt)}
                        </p>
                      </div>
                      {/* AI Response */}
                      <div className="flex justify-start">
                        <p
                          className="bg-white p-2 rounded-lg shadow-md "
                          dangerouslySetInnerHTML={{
                            __html: formatText(chat.response),
                          }}
                        ></p>
                      </div>
                      {/* Timestamp */}
                      <div className="text-xs text-gray-500 text-right">
                        {new Date(chat.createdAt).toLocaleTimeString()}
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentArea;
