
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { defaultUserProfile, type UserProfile } from '@/utils/mockData';
import { cn } from '@/lib/utils';

export function ProfileSetup() {
  const [profile, setProfile] = useState<UserProfile>(defaultUserProfile);
  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Load profile from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Error parsing profile:', error);
      }
    }
  }, []);
  
  // Save profile to localStorage
  const saveProfile = () => {
    setIsSaving(true);
    
    try {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      
      setTimeout(() => {
        setIsSaving(false);
        toast.success('Profile saved successfully');
      }, 800);
    } catch (error) {
      console.error('Error saving profile:', error);
      setIsSaving(false);
      toast.error('Failed to save profile');
    }
  };
  
  const addAllergy = () => {
    if (!newAllergy.trim()) return;
    
    if (profile.allergies.includes(newAllergy.trim())) {
      toast.error('This allergy is already in your list');
      return;
    }
    
    setProfile(prev => ({
      ...prev,
      allergies: [...prev.allergies, newAllergy.trim()]
    }));
    setNewAllergy('');
  };
  
  const removeAllergy = (index: number) => {
    setProfile(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };
  
  const addCondition = () => {
    if (!newCondition.trim()) return;
    
    if (profile.medical_conditions.includes(newCondition.trim())) {
      toast.error('This condition is already in your list');
      return;
    }
    
    setProfile(prev => ({
      ...prev,
      medical_conditions: [...prev.medical_conditions, newCondition.trim()]
    }));
    setNewCondition('');
  };
  
  const removeCondition = (index: number) => {
    setProfile(prev => ({
      ...prev,
      medical_conditions: prev.medical_conditions.filter((_, i) => i !== index)
    }));
  };
  
  return (
    <div className="w-full max-w-lg mx-auto space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground/90 mb-1">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={profile.name}
            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-primary focus:ring focus:ring-primary/30 focus:outline-none transition-all bg-background"
            placeholder="Enter your name"
          />
        </div>
        
        {/* Allergies Section */}
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1">
            Allergies
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addAllergy()}
              className="flex-1 px-4 py-2.5 rounded-lg border border-border focus:border-primary focus:ring focus:ring-primary/30 focus:outline-none transition-all bg-background"
              placeholder="Add allergy (e.g., Benzoyl Peroxide)"
            />
            <button
              onClick={addAllergy}
              disabled={!newAllergy.trim()}
              className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Add
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {profile.allergies.length === 0 ? (
              <p className="text-sm text-muted-foreground">No allergies added</p>
            ) : (
              profile.allergies.map((allergy, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/80 text-secondary-foreground"
                >
                  <span className="text-sm">{allergy}</span>
                  <button
                    onClick={() => removeAllergy(index)}
                    className="w-4 h-4 flex items-center justify-center rounded-full bg-secondary-foreground/10 text-secondary-foreground opacity-60 hover:opacity-100 transition-opacity"
                    aria-label="Remove allergy"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="10" 
                      height="10" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Medical Conditions Section */}
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1">
            Medical Conditions
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newCondition}
              onChange={(e) => setNewCondition(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCondition()}
              className="flex-1 px-4 py-2.5 rounded-lg border border-border focus:border-primary focus:ring focus:ring-primary/30 focus:outline-none transition-all bg-background"
              placeholder="Add condition (e.g., Pregnancy, Rosacea)"
            />
            <button
              onClick={addCondition}
              disabled={!newCondition.trim()}
              className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Add
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {profile.medical_conditions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No medical conditions added</p>
            ) : (
              profile.medical_conditions.map((condition, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/80 text-secondary-foreground"
                >
                  <span className="text-sm">{condition}</span>
                  <button
                    onClick={() => removeCondition(index)}
                    className="w-4 h-4 flex items-center justify-center rounded-full bg-secondary-foreground/10 text-secondary-foreground opacity-60 hover:opacity-100 transition-opacity"
                    aria-label="Remove condition"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="10" 
                      height="10" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <button
        onClick={saveProfile}
        disabled={isSaving}
        className={cn(
          "w-full px-4 py-3 text-base font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50",
          "bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
        )}
      >
        {isSaving ? (
          <span className="flex items-center justify-center">
            <svg 
              className="w-5 h-5 mr-2 animate-spin" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Saving...
          </span>
        ) : (
          "Save Profile"
        )}
      </button>
    </div>
  );
}

export default ProfileSetup;
