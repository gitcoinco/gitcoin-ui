import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui-shadcn/tabs";

interface VerticalTabProps {
  triggerContent: React.ReactNode;
  triggerValue: string;
  tabContent: React.ReactNode;
}

export interface VerticalTabsProps {
  tabs: VerticalTabProps[];
}

export const VerticalTab = ({ tabs }: VerticalTabsProps) => {
  return (
    <Tabs orientation="vertical" defaultValue={tabs[0]?.triggerValue} className="flex gap-6">
      {/* Tabs List - Vertical orientation */}
      <TabsList className="flex flex-col justify-around bg-white">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.triggerValue}
            value={tab.triggerValue}
            className="w-full justify-start p-2 data-[state=active]:bg-grey-50"
          >
            {tab.triggerContent}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tabs Content */}
      <div className="flex-1 px-4">
        {tabs.map((tab) => (
          <TabsContent key={tab.triggerValue} value={tab.triggerValue} className="mt-0">
            {tab.tabContent}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};
