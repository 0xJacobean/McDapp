import { VerifiedIcon } from 'assets';
import Link from 'components/Link';
import makeBlockie from 'ethereum-blockies-base64';
import React, { FC, useEffect, useState } from 'react';

type Props = {
  verified?: boolean;
  additionalClasses?: string;
  sizeClasses?: string;
  verificationSymbolSizes?: string;
  username: string;
};

const Avatar: FC<Props> = ({
  verified = false,
  additionalClasses = '',
  sizeClasses,
  username,
  verificationSymbolSizes,
}) => {
  const [imgSrc, setImgSrc] = useState(null);
  useEffect(() => {
    if (username) {
      setImgSrc(makeBlockie(username));
    }
  }, [username]);

  return (
    <Link to={`/profile/${username}`}>
      <div className="relative flex cursor-pointer shadow-sm">
        <img
          className={`${additionalClasses} ${
            sizeClasses ?? 'w-10 h-10'
          } flex-shrink-0 border-2 border-gray-700 rounded-full`}
          src={imgSrc}
          alt="avatar"
        />
        {verified && (
          <img className={`absolute bottom-0 right-0 ${verificationSymbolSizes ?? 'w-6 h-6'}`} src={VerifiedIcon} />
        )}
      </div>
    </Link>
  );
};
export default Avatar;
