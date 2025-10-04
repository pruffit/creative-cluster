import { useEffect, useState } from 'react';
import {
  YogaHero,
  YogaSchedule,
  YogaSubscriptions,
  YogaInstructors,
  YogaBlog,
} from '@widgets/yoga';
import { yogaApi } from '@shared/api/yoga.api';
import type { YogaClass, Subscription, YogaInstructor, BlogPost } from '@shared/api/yoga.api';
import { Spinner } from '@shared/ui';

export const YogaPage = () => {
  const [schedule, setSchedule] = useState<YogaClass[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [instructors, setInstructors] = useState<YogaInstructor[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [classesData, subsData, instructorsData, postsData] = await Promise.all([
          yogaApi.getClasses(),
          yogaApi.getSubscriptions(),
          yogaApi.getInstructors(),
          yogaApi.getBlogPosts(),
        ]);

        setSchedule(classesData);
        setSubscriptions(subsData);
        setInstructors(instructorsData);
        setBlogPosts(postsData);
      } catch (error) {
        console.error('Failed to load yoga data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <YogaHero />

      {schedule.length > 0 && (
        <div id="schedule">
          <YogaSchedule schedule={schedule} />
        </div>
      )}

      {subscriptions.length > 0 && (
        <div id="subscriptions">
          <YogaSubscriptions subscriptions={subscriptions} />
        </div>
      )}

      {instructors.length > 0 && <YogaInstructors instructors={instructors} />}

      {blogPosts.length > 0 && <YogaBlog posts={blogPosts} />}

      {schedule.length === 0 &&
        subscriptions.length === 0 &&
        instructors.length === 0 &&
        blogPosts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-xl text-text-secondary">
              Данные пока не добавлены. Используйте админ-панель для добавления занятий,
              абонементов и статей.
            </p>
          </div>
        )}
    </div>
  );
};