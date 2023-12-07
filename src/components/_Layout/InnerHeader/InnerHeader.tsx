import React from "react";
import Image from "next/image";

type props = {
  type: "Collector" | "Mission" | "Storer";
  verified: boolean;
  avatar: string;
  title: string;
  totalRewarded?: number;
  totalEarned?: number;
  incident?: number;
  successRate?: number;
  scanned?: number;
  stored?: number;
  returned?: number;
  missions?: number;
  address: string;
  className?: string;
  onClick?: () => void;
};

const InnerHeader = (props: props) => {
  const {
    type,
    verified,
    avatar,
    title,
    totalRewarded,
    totalEarned,
    incident,
    successRate,
    scanned,
    stored,
    returned,
    missions,
    address,
    className,
  } = props;

  const truncatedAddress =
    address.length > 16 ? address.slice(0, 16) + "..." : address;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between bg-gray pb-11 pl-7 pr-7 pt-11 font-primary">
        <div className="flex items-center gap-4 font-primary text-lg font-bold text-darkgray">
          <Image
            src={avatar}
            alt="image"
            width={48}
            height={48}
            unoptimized
            className="rounded-full outline outline-2 outline-purple"
          />
          {title}
        </div>
        <div className="flex gap-3">
          {verified ? (
            <>
              {totalRewarded != undefined && (
                <div className="mb-auto ml-3 mr-3 mt-auto text-xs font-normal text-darkgray">
                  ${totalRewarded} Total Rewarded
                </div>
              )}
              {totalEarned != undefined && (
                <div className="mb-auto ml-3 mr-3 mt-auto text-xs font-normal text-darkgray">
                  ${totalEarned} Total Earned
                </div>
              )}
              {incident != undefined && (
                <div className="mb-auto ml-3 mr-3 mt-auto text-xs font-normal text-darkgray">
                  {incident} Incident
                </div>
              )}
              {successRate != undefined && (
                <div className="mb-auto ml-3 mr-3 mt-auto text-xs font-normal text-darkgray">
                  %{successRate} Success Rate
                </div>
              )}
              <div className="ml-6 mr-6 flex items-center gap-3">
                {scanned != undefined && (
                  <div className="rounded-full bg-purple bg-opacity-20 px-2 py-1 text-xs font-normal text-purple">
                    +{scanned} Scanned
                  </div>
                )}
                {stored != undefined && (
                  <div className="rounded-full bg-green bg-opacity-20 px-2 py-1 text-xs font-normal text-green">
                    +{stored} Stored
                  </div>
                )}
                {returned != undefined && (
                  <div className="rounded-full bg-darkestpurple bg-opacity-20 px-2 py-1 text-xs font-normal text-darkestpurple">
                    +{returned} Returned
                  </div>
                )}
              </div>
              {missions && (
                <div className="mb-auto mt-auto text-xs font-normal text-darkgray">
                  +{missions} Missions
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center rounded-full bg-unverified bg-opacity-20 px-2 py-1 text-xs font-normal text-unverified">
              {type} Not Verified
              <Image
                src="/assets/images/unverified.svg"
                alt="image"
                width={24}
                height={24}
                unoptimized
                style={{ marginLeft: "8px" }}
              />
            </div>
          )}

          <div className="flex items-center">
            {verified && (
              <>
                <Image
                  src="/assets/images/coca-cola.png"
                  alt="cola"
                  width="29"
                  height="29"
                  unoptimized
                  className="rounded-full outline outline-2 outline-white"
                />
                <Image
                  src="/assets/images/heinken.png"
                  alt="heinken"
                  width="29"
                  height="29"
                  unoptimized
                  className="-ml-1 rounded-full outline outline-2 outline-white"
                />
                <Image
                  src="/assets/images/mo-garage.png"
                  alt="garage"
                  width="29"
                  height="29"
                  unoptimized
                  className="-ml-1 rounded-full outline outline-2 outline-white"
                />
              </>
            )}
            <div className="mb-auto ml-6 mt-auto text-base font-normal text-darkgray">
              {truncatedAddress}
            </div>
            <div className="ml-6 flex items-center gap-6">
              <Image
                src="/assets/images/profile.svg"
                alt="image"
                width={24}
                height={24}
                unoptimized
              />
              <Image
                src="/assets/images/message.svg"
                alt="image"
                width={24}
                height={24}
                unoptimized
                onClick={props.onClick}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerHeader;
