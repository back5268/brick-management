import { Link } from 'react-router-dom';
import { Logo } from '.';

export const AuthWrapper = (props) => {
  const { headerLabel = '', children, footerLabel = '', footerHref = '' } = props;
  return (
    <div className="relative min-h-screen flex justify-center">
      <div className="relative flex justify-center items-center">
        <div className="w-[24rem] py-12 px-6 shadow-custom rounded-md">
          <div className="text-center">
            <Logo className="mb-6" />
            <p className="mb-8 text-md text-primary uppercase font-semibold">{headerLabel}</p>
          </div>
          {children}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-border after:mt-0.5 after:flex-1 after:border-t after:border-border">
              <p className="mx-4 mb-0 text-center font-semibold">OR</p>
            </div>
            <Link to={footerHref} className="text-sm text-primary font-medium text-center">
              {footerLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
