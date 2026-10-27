"use client";

import { bidderContext } from "@/context/Context";
import { fetchMessages } from "@/lib/actions/fetchmessage";
import { IMessage } from "@/models/type";
import { useContext, useEffect, useState } from "react";
import Chatbox from "./Chatcompo/Chatbox";

const Rightchatbar = () => {
  const { chatdetails } = useContext(bidderContext)!;

  const [productBuyermsgs, setProductBuyermsgs] = useState<IMessage[]>([]);

  useEffect(() => {
    if (!chatdetails) {
      setProductBuyermsgs([]);
      return;
    }

    const fetchAllMessages = async () => {
      try {
        const res = await fetchMessages(
          chatdetails.sender._id!.toString(),
          chatdetails.receiver._id!.toString(),
          chatdetails.product._id!.toString()
        );

        if (res.success) {
          setProductBuyermsgs(res.payload);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllMessages();
  }, [chatdetails]);

  if (!chatdetails) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Select a buyer to view messages</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Chatbox
        sender={chatdetails.sender}
        receiver={chatdetails.receiver}
        currProduct={chatdetails.product}
        messages={productBuyermsgs}
      />
    </div>
  );
};

export default Rightchatbar;