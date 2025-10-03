import {
  YogaHero,
  YogaSchedule,
  YogaSubscriptions,
  YogaInstructors,
  YogaBlog,
} from '@widgets/yoga';
import { mockSchedule, mockSubscriptions, mockInstructors, mockBlogPosts } from '@entities/yoga';

export const YogaPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <YogaHero />

      <div id="schedule">
        <YogaSchedule schedule={mockSchedule} />
      </div>

      <div id="subscriptions">
        <YogaSubscriptions subscriptions={mockSubscriptions} />
      </div>

      <YogaInstructors instructors={mockInstructors} />

      <YogaBlog posts={mockBlogPosts} />
    </div>
  );
};
