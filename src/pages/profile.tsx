import type { NextPageWithLayout } from './_app';
import MainLayout from '../components/MainLayout';

const Profile: NextPageWithLayout = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Profile</h1>
      <p className="text-gray-600">User profile information goes here.</p>
    </div>
  );
};

Profile.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Profile;
