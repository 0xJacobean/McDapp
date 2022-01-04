import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Logo } from 'assets';
import Button from 'components/Button';
import { ButtonType } from 'components/Button/Button';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect } from 'react';
import { getOnboard } from 'utils/walletUtils';
import { useWallet } from 'wallet/state';
import ProfileDropdown from './ProfileDropdown';

const Navbar: FC<unknown> = () => {
  const router = useRouter();
  const goToHome = useCallback(() => {
    router.push('/');
  }, [router]);
  const [state, dispatch] = useWallet();

  const reconnectWallet = useCallback(async (walletName: string) => {
    const onboard = getOnboard(dispatch);
    if (await onboard.walletSelect(walletName)) {
      await onboard.walletCheck();
    }
  }, []);

  useEffect(() => {
    const previousWallet = localStorage.getItem('walletName');
    if (previousWallet) {
      reconnectWallet(previousWallet);
    }
  }, []);

  const handleWallet = useCallback(async () => {
    const onboard = getOnboard(dispatch);

    const selected = await onboard.walletSelect(localStorage.getItem('walletName'));
    if (selected) {
      await onboard.walletCheck();
    }
  }, []);

  return (
    <nav className="sticky top-0 z-20 bg-primary shadow-sm">
      <div className="flex px-2 py-2.5 mx-auto max-w-screen-2xl sm:px-4 lg:px-8">
        <div className="flex items-center justify-between w-full px-2 lg:px-0 ">
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div onClick={goToHome} className=" w-auto h-full cursor-pointer text-2xl">
                🥦
              </div>
              <span onClick={goToHome} className="h-auto pl-3 text-xl font-bold text-black cursor-pointer align-center">
                420 DAO
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 lg:space-12">
            {!state.address ? (
              <Button type={ButtonType.Secondary} title="Connect wallet" onClick={handleWallet} />
            ) : (
              <ProfileDropdown />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
