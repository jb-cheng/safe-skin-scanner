
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileSetup from '@/components/ProfileSetup';

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 pt-28 pb-16 px-4">
        <div className="container max-w-3xl">
          <div className="mb-10 text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Your Profile</h1>
            <p className="mt-3 text-muted-foreground">
              Set up your profile with allergies and medical conditions for personalized ingredient analysis
            </p>
          </div>
          
          <div className="p-6 md:p-8 rounded-2xl border border-border backdrop-blur-sm glass-light">
            <ProfileSetup />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
