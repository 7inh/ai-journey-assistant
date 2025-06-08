"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface UserPreference {
  enableSuggestions: boolean;
  enableHistory: boolean;
  enableNotifications: boolean;
  messageHistoryLength: number;
  responseDetailLevel: number;
}

const defaultPreferences: UserPreference = {
  enableSuggestions: true,
  enableHistory: true,
  enableNotifications: false,
  messageHistoryLength: 50,
  responseDetailLevel: 2,
};

export function UserPreferences() {
  const [preferences, setPreferences] =
    useState<UserPreference>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Simulate loading preferences from API or local storage
    const loadPreferences = async () => {
      try {
        // In a real app, you would fetch from API or load from localStorage
        const savedPreferences = localStorage.getItem("userPreferences");
        if (savedPreferences) {
          setPreferences(JSON.parse(savedPreferences));
        }
      } catch (error) {
        console.error("Failed to load preferences:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const handleSavePreferences = async () => {
    setIsSaving(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Save to localStorage (in a real app, you'd also send to an API)
      localStorage.setItem("userPreferences", JSON.stringify(preferences));

      toast({
        title: "Preferences saved",
        description: "Your AI assistant preferences have been updated.",
      });
    } catch (error) {
      console.error("Failed to save preferences:", error);
      toast({
        title: "Error saving preferences",
        description:
          "There was a problem saving your preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Assistant Preferences</CardTitle>
        <CardDescription>
          Customize how your AI assistant interacts with you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="suggestions">Suggestions</Label>
              <p className="text-sm text-muted-foreground">
                Allow the AI to suggest follow-up questions
              </p>
            </div>
            <Switch
              id="suggestions"
              checked={preferences.enableSuggestions}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, enableSuggestions: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="history">Conversation History</Label>
              <p className="text-sm text-muted-foreground">
                Save your conversation history
              </p>
            </div>
            <Switch
              id="history"
              checked={preferences.enableHistory}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, enableHistory: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications from AI assistants
              </p>
            </div>
            <Switch
              id="notifications"
              checked={preferences.enableNotifications}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, enableNotifications: checked })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="history-length">Message History Length</Label>
            <span className="text-sm font-medium">
              {preferences.messageHistoryLength} messages
            </span>
          </div>
          <Slider
            id="history-length"
            min={10}
            max={100}
            step={10}
            value={[preferences.messageHistoryLength]}
            onValueChange={(value) =>
              setPreferences({ ...preferences, messageHistoryLength: value[0] })
            }
          />
          <p className="text-xs text-muted-foreground">
            Number of messages to retain in conversation history
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="detail-level">Response Detail Level</Label>
            <span className="text-sm font-medium">
              {preferences.responseDetailLevel === 1
                ? "Concise"
                : preferences.responseDetailLevel === 2
                ? "Balanced"
                : "Detailed"}
            </span>
          </div>
          <Slider
            id="detail-level"
            min={1}
            max={3}
            step={1}
            value={[preferences.responseDetailLevel]}
            onValueChange={(value) =>
              setPreferences({ ...preferences, responseDetailLevel: value[0] })
            }
          />
          <p className="text-xs text-muted-foreground">
            Adjust how detailed AI responses should be
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => setPreferences(defaultPreferences)}
        >
          Reset to Default
        </Button>
        <Button onClick={handleSavePreferences} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  );
}
