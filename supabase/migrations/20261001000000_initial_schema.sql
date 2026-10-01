-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile." ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Subjects table
CREATE TABLE subjects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  course_code TEXT,
  credit_value INTEGER
);
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own subjects." ON subjects FOR ALL USING (auth.uid() = user_id);

-- Chapters table
CREATE TABLE chapters (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('theory', 'practical')) DEFAULT 'theory',
  is_completed BOOLEAN DEFAULT false,
  revision_due_date DATE,
  revision_completed BOOLEAN DEFAULT false,
  coding_practice_completed BOOLEAN DEFAULT false,
  notes TEXT,
  is_difficult BOOLEAN DEFAULT false
);
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own chapters." ON chapters FOR ALL USING (auth.uid() = user_id);

-- Study Sessions
CREATE TABLE study_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER NOT NULL,
  notes TEXT
);
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own study sessions." ON study_sessions FOR ALL USING (auth.uid() = user_id);

-- Training Events (Rugby/Gym)
CREATE TABLE training_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  date DATE NOT NULL,
  type TEXT CHECK (type IN ('rugby_practice', 'rugby_match', 'match_travel', 'gym', 'recovery')) NOT NULL,
  notes TEXT
);
ALTER TABLE training_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own training events." ON training_events FOR ALL USING (auth.uid() = user_id);

-- Gym Workouts
CREATE TABLE gym_workouts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES training_events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  template_name TEXT,
  completed_at TIMESTAMP WITH TIME ZONE
);
ALTER TABLE gym_workouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own workouts." ON gym_workouts FOR ALL USING (auth.uid() = user_id);

-- Workout Exercises & Sets
CREATE TABLE workout_sets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workout_id UUID REFERENCES gym_workouts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  exercise_name TEXT NOT NULL,
  set_number INTEGER NOT NULL,
  reps INTEGER,
  weight DECIMAL,
  is_completed BOOLEAN DEFAULT false
);
ALTER TABLE workout_sets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own sets." ON workout_sets FOR ALL USING (auth.uid() = user_id);

-- Fitness Tracking (Body weight, meals, etc)
CREATE TABLE fitness_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  date DATE NOT NULL,
  body_weight DECIMAL,
  estimated_protein INTEGER,
  sleep_notes TEXT,
  soreness_notes TEXT
);
ALTER TABLE fitness_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own fitness logs." ON fitness_logs FOR ALL USING (auth.uid() = user_id);

-- Habits
CREATE TABLE habits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT
);
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own habits." ON habits FOR ALL USING (auth.uid() = user_id);

CREATE TABLE habit_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  date DATE NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  UNIQUE(habit_id, date)
);
ALTER TABLE habit_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own habit records." ON habit_records FOR ALL USING (auth.uid() = user_id);

-- Assessments
CREATE TABLE assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  marks_obtained DECIMAL,
  max_marks DECIMAL,
  weighting DECIMAL,
  exam_date DATE
);
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own assessments." ON assessments FOR ALL USING (auth.uid() = user_id);

-- Weekly Reviews
CREATE TABLE weekly_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  week_start_date DATE NOT NULL,
  wins TEXT,
  obstacles TEXT,
  next_week_priorities TEXT
);
ALTER TABLE weekly_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own weekly reviews." ON weekly_reviews FOR ALL USING (auth.uid() = user_id);
