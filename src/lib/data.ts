export interface Therapist {
    id: string;
    name: string;
    title: string;
    bio: string;
    longBio: string;
    location: string;
    type: 'Remote' | 'In-person' | 'Both';
    specialties: string[];
    qualifications: string[];
    techniques: string[];
    insuranceAccepted: string[];
    imageUrl: string;
    hourlyRate: number;
    tier: 'Free' | 'Premium';
    onlineBooking: boolean;
    availableSlots: string[]; // ISO 8601 date-time strings
}

// Helper to generate mock slots for the next 30 days
function generateMockSlots(): string[] {
    const slots: string[] = [];
    const now = new Date();
    const days = 30;

    for (let i = 1; i <= days; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() + i);

        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;

        // Add some random slots between 9am and 5pm
        const startHour = 9;
        const endHour = 17;

        for (let hour = startHour; hour < endHour; hour++) {
            // 50% chance of a slot being available
            if (Math.random() > 0.5) {
                const slotDate = new Date(date);
                slotDate.setHours(hour, 0, 0, 0);
                slots.push(slotDate.toISOString());
            }
            // 50% chance of the half-hour slot being available
            if (Math.random() > 0.5) {
                const slotDate = new Date(date);
                slotDate.setHours(hour, 30, 0, 0);
                slots.push(slotDate.toISOString());
            }
        }
    }
    return slots;
}

export const MOCK_THERAPISTS: Therapist[] = [
    {
        id: '1',
        name: 'Dr. Sarah Chen',
        title: 'Clinical Psychologist',
        bio: 'Specializing in anxiety and stress management with a cognitive behavioral approach. I help clients find balance and peace in their daily lives.',
        longBio: 'Dr. Sarah Chen is a dedicated Clinical Psychologist with over 10 years of experience helping individuals overcome anxiety, stress, and burnout. She believes in a collaborative approach, working closely with clients to identify triggers and develop practical coping strategies. Her practice is rooted in evidence-based therapies, ensuring that every client receives the most effective care tailored to their unique needs. When she is not seeing clients, Dr. Chen enjoys hiking and practicing mindfulness meditation.',
        location: 'London, UK',
        type: 'Both',
        specialties: ['Anxiety', 'Stress', 'Burnout'],
        qualifications: ['DClinPsy, University College London', 'HCPC Registered Psychologist', 'BABCP Accredited'],
        techniques: ['Cognitive Behavioral Therapy (CBT)', 'Mindfulness-Based Stress Reduction (MBSR)', 'Acceptance and Commitment Therapy (ACT)'],
        insuranceAccepted: ['BUPA', 'AXA PPP', 'Aviva'],
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
        hourlyRate: 120,
        tier: 'Premium',
        onlineBooking: true,
        availableSlots: generateMockSlots()
    },
    {
        id: '2',
        name: 'James Wilson, LMFT',
        title: 'Family Therapist',
        bio: 'Dedicated to helping couples and families navigate complex relationship dynamics. I provide a safe space for open communication.',
        longBio: 'James Wilson is a compassionate Family Therapist who specializes in relationship dynamics and family conflict. With a warm and non-judgmental approach, he creates a safe environment where couples and families can express themselves openly. James helps clients break negative patterns, improve communication skills, and rebuild trust. He is passionate about helping people foster deeper connections and healthier relationships.',
        location: 'Manchester, UK',
        type: 'In-person',
        specialties: ['Relationships', 'Family Conflict', 'Depression'],
        qualifications: ['MSc in Family Therapy, University of Manchester', 'UKCP Registered', 'AFT Member'],
        techniques: ['Systemic Family Therapy', 'Narrative Therapy', 'Emotionally Focused Therapy (EFT)'],
        insuranceAccepted: ['Vitality', 'WPA', 'Cigna'],
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
        hourlyRate: 90,
        tier: 'Free',
        onlineBooking: false,
        availableSlots: []
    },
    {
        id: '3',
        name: 'Dr. Emily Rodriguez',
        title: 'Consultant Psychiatrist',
        bio: 'Expert in mood disorders and medication management. I believe in a holistic approach to mental health combining therapy and medical support.',
        longBio: 'Dr. Emily Rodriguez is a Consultant Psychiatrist with a focus on mood disorders and holistic mental health. She combines her medical expertise with a deep understanding of psychotherapy to provide comprehensive care. Dr. Rodriguez believes that medication is just one tool in the toolbox and emphasizes the importance of lifestyle changes, therapy, and self-care in achieving mental wellness. She works with adults of all ages to manage conditions like depression, bipolar disorder, and severe anxiety.',
        location: 'Edinburgh, UK',
        type: 'Remote',
        specialties: ['Depression', 'Bipolar Disorder', 'Anxiety'],
        qualifications: ['MRCPsych, Royal College of Psychiatrists', 'CCT in General Adult Psychiatry', 'MSc in Neuroscience'],
        techniques: ['Medication Management', 'Psychodynamic Psychotherapy', 'Supportive Therapy'],
        insuranceAccepted: ['BUPA', 'AXA PPP', 'Vitality'],
        imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
        hourlyRate: 200,
        tier: 'Premium',
        onlineBooking: false,
        availableSlots: []
    },
    {
        id: '4',
        name: 'Michael Chang, LCSW',
        title: 'Psychotherapist',
        bio: 'Focusing on trauma recovery and PTSD. I use evidence-based techniques to help you heal from the past and move forward.',
        longBio: 'Michael Chang is a Psychotherapist dedicated to supporting individuals on their journey of trauma recovery. He understands the profound impact that past experiences can have on the present and uses a trauma-informed approach to help clients heal. Michael is trained in EMDR and other somatic techniques that address trauma stored in the body. He provides a supportive and empowering space for clients to process their experiences and reclaim their lives.',
        location: 'Bristol, UK',
        type: 'Both',
        specialties: ['Trauma', 'PTSD', 'Grief'],
        qualifications: ['MA in Psychotherapy, University of Leeds', 'BACP Accredited', 'EMDR Europe Accredited Practitioner'],
        techniques: ['Eye Movement Desensitization and Reprocessing (EMDR)', 'Somatic Experiencing', 'Internal Family Systems (IFS)'],
        insuranceAccepted: ['Aviva', 'Simplyhealth', 'Benenden Health'],
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
        hourlyRate: 85,
        tier: 'Free',
        onlineBooking: false,
        availableSlots: []
    },
    {
        id: '5',
        name: 'Lisa Thompson, PhD',
        title: 'Counselling Psychologist',
        bio: 'Helping young adults navigate life transitions and career stress. Empowering you to make confident decisions.',
        longBio: 'Dr. Lisa Thompson is a Counselling Psychologist who specializes in working with young adults and professionals navigating major life transitions. Whether it is a career change, relationship shift, or identity exploration, Dr. Thompson provides guidance and support. She uses a strengths-based approach to help clients build confidence, clarify their values, and make decisions that align with their true selves. Her goal is to empower clients to create a life that feels meaningful and fulfilling.',
        location: 'Birmingham, UK',
        type: 'Remote',
        specialties: ['Career Counseling', 'Life Transitions', 'Stress'],
        qualifications: ['DPsych in Counselling Psychology, City University London', 'HCPC Registered', 'BPS Chartered Member'],
        techniques: ['Solution-Focused Brief Therapy (SFBT)', 'Positive Psychology', 'Career Coaching'],
        insuranceAccepted: ['BUPA', 'AXA PPP', 'Cigna'],
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
        hourlyRate: 100,
        tier: 'Premium',
        onlineBooking: true,
        availableSlots: generateMockSlots()
    }
];

export function getTherapistById(id: string): Therapist | undefined {
    return MOCK_THERAPISTS.find(t => t.id === id);
}
