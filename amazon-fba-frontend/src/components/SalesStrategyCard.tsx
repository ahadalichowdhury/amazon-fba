import { type SalesStrategy } from "@/lib/api";
import { Calendar, Clock, Target, TrendingUp } from "lucide-react";

interface SalesStrategyCardProps {
  strategy: SalesStrategy;
}

export function SalesStrategyCard({ strategy }: SalesStrategyCardProps) {
  const strategyPhases = [
    {
      title: "Immediate Actions",
      description: "Quick wins you can implement right away",
      actions: strategy.immediateActions,
      icon: Target,
      color: "border-red-200 bg-red-50",
      textColor: "text-red-800",
      badgeColor: "bg-red-100 text-red-800",
    },
    {
      title: "Short Term Strategy",
      description: "Actions to take over the next 1-3 months",
      actions: strategy.shortTermStrategy,
      icon: Clock,
      color: "border-yellow-200 bg-yellow-50",
      textColor: "text-yellow-800",
      badgeColor: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Long Term Strategy",
      description: "Strategic initiatives for sustained growth",
      actions: strategy.longTermStrategy,
      icon: Calendar,
      color: "border-green-200 bg-green-50",
      textColor: "text-green-800",
      badgeColor: "bg-green-100 text-green-800",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
        Sales Improvement Strategy
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {strategyPhases.map((phase) => {
          const Icon = phase.icon;
          return (
            <div
              key={phase.title}
              className={`border rounded-lg p-6 ${phase.color}`}
            >
              <div className="flex items-center mb-4">
                <Icon className={`w-6 h-6 mr-2 ${phase.textColor}`} />
                <h3 className={`text-lg font-semibold ${phase.textColor}`}>
                  {phase.title}
                </h3>
              </div>

              <p className="text-sm text-gray-600 mb-4">{phase.description}</p>

              <div className="space-y-4">
                {phase.actions.length > 0 ? (
                  phase.actions.map((action, index) => (
                    <div
                      key={index}
                      className="bg-white bg-opacity-70 rounded-lg p-4"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {action.action}
                      </h4>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">
                            Impact:
                          </span>
                          <span className="text-gray-600 ml-1">
                            {action.impact}
                          </span>
                        </div>

                        <div>
                          <span className="font-medium text-gray-700">
                            Timeframe:
                          </span>
                          <span
                            className={`ml-1 px-2 py-1 rounded-full text-xs ${phase.badgeColor}`}
                          >
                            {action.timeframe}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 text-center py-4">
                    No actions identified for this phase
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          Strategy Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {strategy.immediateActions.length}
            </div>
            <div className="text-sm text-blue-700">Immediate Actions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {strategy.shortTermStrategy.length}
            </div>
            <div className="text-sm text-blue-700">Short Term Goals</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {strategy.longTermStrategy.length}
            </div>
            <div className="text-sm text-blue-700">Long Term Initiatives</div>
          </div>
        </div>
      </div>
    </div>
  );
}
