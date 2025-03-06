import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Clock,
  Volume2,
  VolumeX,
  RotateCcw,
  Play,
  Pause,
  SkipForward,
} from "lucide-react";
import _ from "lodash";

const StenoPracticeApp = () => {
  // General app state
  const [activeTab, setActiveTab] = useState("practice");
  const [practiceDifficulty, setPracticeDifficulty] = useState("beginner");
  const [practiceCategory, setPracticeCategory] = useState("common");
  const [practiceWPM, setPracticeWPM] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalTime, setTotalTime] = useState(60); // 60 seconds default
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [nextWords, setNextWords] = useState([]);
  const [results, setResults] = useState(null);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    accuracy: 100,
    wpm: 0,
    wordsCompleted: 0,
    totalWords: 0,
  });

  const timerRef = useRef(null);
  const wordIntervalRef = useRef(null);

  // Dictionary of practice content
  const practiceContent = {
    beginner: {
      common: [
        "the",
        "of",
        "and",
        "a",
        "to",
        "in",
        "is",
        "you",
        "that",
        "it",
        "he",
        "was",
        "for",
        "on",
        "are",
        "as",
        "with",
        "his",
        "they",
        "I",
        "at",
        "be",
        "this",
        "have",
        "from",
        "or",
        "one",
        "had",
        "by",
        "but",
        "what",
        "all",
        "were",
        "we",
        "when",
        "your",
        "can",
        "said",
        "there",
        "use",
      ],
      legal: [
        "court",
        "judge",
        "jury",
        "legal",
        "case",
        "law",
        "file",
        "claim",
        "brief",
        "motion",
        "party",
        "order",
        "trial",
        "right",
        "state",
        "argue",
        "admit",
        "sworn",
        "fact",
        "date",
        "rule",
        "time",
        "hear",
        "good",
        "plea",
        "side",
        "oral",
        "sign",
        "duty",
        "oath",
      ],
      numbers: [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "first",
        "second",
        "third",
        "once",
        "twice",
        "10",
        "20",
        "30",
        "40",
        "50",
        "100",
        "1,000",
        "half",
        "third",
        "quarter",
        "January",
        "March",
        "July",
        "August",
        "December",
      ],
    },
    intermediate: {
      common: [
        "because",
        "through",
        "between",
        "important",
        "different",
        "several",
        "government",
        "children",
        "knowledge",
        "information",
        "business",
        "together",
        "question",
        "experience",
        "education",
        "university",
        "community",
        "department",
        "development",
        "president",
        "available",
        "political",
        "especially",
        "sometimes",
        "everything",
        "understand",
        "particular",
        "certainly",
        "necessary",
        "situation",
      ],
      legal: [
        "plaintiff",
        "defendant",
        "testimony",
        "objection",
        "evidence",
        "counsel",
        "witness",
        "document",
        "pursuant",
        "deposition",
        "proceeding",
        "judgment",
        "attorney",
        "statement",
        "affidavit",
        "pursuant",
        "contract",
        "discovery",
        "testimony",
        "statute",
        "hearing",
        "subpoena",
        "argument",
        "settlement",
        "violation",
        "litigation",
        "precedent",
        "jurisdiction",
        "disclosure",
        "allegation",
      ],
      numbers: [
        "twenty-five",
        "seventy-three",
        "one hundred forty-two",
        "three thousand",
        "fifty-six percent",
        "four hundred eighty",
        "October 15, 2023",
        "June 7, 1998",
        "July 4, 1776",
        "March 14, 2024",
        "$1,250.75",
        "$498.62",
        "$10,000",
        "$2.5 million",
        "3:45 p.m.",
        "9:30 a.m.",
        "12:15 p.m.",
        "7:22 a.m.",
        "555-123-4567",
        "212-555-8901",
      ],
    },
    advanced: {
      common: [
        "notwithstanding",
        "simultaneously",
        "misrepresentation",
        "disproportionate",
        "characteristics",
        "infrastructure",
        "comprehensive",
        "representative",
        "extraordinary",
        "differentiation",
        "indistinguishable",
        "implementation",
        "accountability",
        "collaboration",
        "constitutional",
        "identification",
        "responsibility",
        "administrative",
        "classification",
        "recommendation",
      ],
      legal: [
        "notwithstanding the foregoing",
        "heretofore",
        "aforementioned",
        "jurisprudence",
        "indemnification",
        "cross-examination",
        "preponderance of evidence",
        "beyond reasonable doubt",
        "res judicata",
        "habeas corpus",
        "in limine",
        "pro se representation",
        "voir dire proceedings",
        "de novo review",
        "amicus curiae",
        "prima facie evidence",
        "breach of fiduciary duty",
        "motion for summary judgment",
        "abuse of discretion",
        "force majeure",
      ],
      medical: [
        "electrocardiogram",
        "gastroenterological",
        "orthopedic surgeon",
        "magnetic resonance imaging",
        "cardiovascular disease",
        "cerebrovascular accident",
        "osteoarthritis",
        "pharmaceutical intervention",
        "neurological examination",
        "hypercholesterolemia",
        "gastrointestinal endoscopy",
        "pulmonary embolism",
        "myocardial infarction",
        "electronystagmography",
        "immunoglobulin",
      ],
    },
  };

  // Phrases for testing
  const testingPhrases = {
    literary: [
      "The early morning fog rolled across the quiet lake, creating a mystical atmosphere that enveloped the surrounding forest.",
      "Despite numerous attempts to solve the complex problem, the team remained stumped until a fresh perspective emerged.",
      "Throughout history, great civilizations have risen and fallen, each leaving behind artifacts that tell their unique stories.",
    ],
    juryCharge: [
      "Ladies and gentlemen of the jury, you must consider all evidence presented during this trial and make your decision based solely on the facts.",
      "The burden of proof rests with the prosecution, who must demonstrate beyond reasonable doubt that the defendant committed the alleged crime.",
      "If you find that any witness has deliberately testified falsely about any material fact, you may disregard all or part of that witness's testimony.",
    ],
    testimony: [
      "Q: Can you describe what you observed on the evening of March 15th?\nA: Yes, I was returning home from work at approximately 8:30 p.m. when I noticed unusual activity near the building entrance.",
      "Q: And how long have you been employed at the company?\nA: I've worked there for nearly seven years, though my position has changed during that time.\nQ: Could you elaborate on those changes?\nA: Certainly. I started in accounting and was promoted to finance manager after three years.",
      "Q: Doctor, in your professional opinion, what caused these injuries?\nA: Based on my examination and the medical evidence, these injuries are consistent with a fall from significant height, not with the scenario described by the plaintiff.",
    ],
  };

  // Generate a set of practice words based on current settings
  const generatePracticeWords = () => {
    const category = practiceContent[practiceDifficulty][practiceCategory];
    return _.shuffle(category);
  };

  // Start practice session
  const startPracticeSession = () => {
    // Reset states
    setElapsedTime(0);
    setProgressPercent(0);
    setIsPlaying(true);
    setResults(null);

    // Set up words
    const words = generatePracticeWords();
    setCurrentWord(words[0]);
    setNextWords(words.slice(1, 5));
    setRealTimeMetrics({
      accuracy: 100,
      wpm: 0,
      wordsCompleted: 0,
      totalWords: words.length,
    });

    // Start timer
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => {
        const newTime = prev + 1;
        const newProgress = (newTime / totalTime) * 100;
        setProgressPercent(newProgress);

        // End session if time is up
        if (newTime >= totalTime) {
          endPracticeSession();
        }

        return newTime;
      });
    }, 1000);

    // Start word display based on WPM
    const msPerWord = Math.floor(60000 / practiceWPM);
    wordIntervalRef.current = setInterval(() => {
      if (words.length > 0) {
        setRealTimeMetrics((prev) => ({
          ...prev,
          wordsCompleted: prev.wordsCompleted + 1,
          wpm: Math.round((prev.wordsCompleted + 1) / (elapsedTime / 60) || 0),
        }));

        const updatedWords = [...words];
        updatedWords.shift();

        if (updatedWords.length > 0) {
          setCurrentWord(updatedWords[0]);
          setNextWords(updatedWords.slice(1, 5));
        } else {
          endPracticeSession();
        }
      }
    }, msPerWord);
  };

  // End practice session
  const endPracticeSession = () => {
    setIsPlaying(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (wordIntervalRef.current) {
      clearInterval(wordIntervalRef.current);
    }

    // Generate results
    setResults({
      duration: elapsedTime,
      wordsCompleted: realTimeMetrics.wordsCompleted,
      wpm: realTimeMetrics.wpm,
      accuracy: realTimeMetrics.accuracy,
    });
  };

  // Pause practice session
  const pausePracticeSession = () => {
    setIsPlaying(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (wordIntervalRef.current) {
      clearInterval(wordIntervalRef.current);
    }
  };

  // Resume practice session
  const resumePracticeSession = () => {
    setIsPlaying(true);

    // Resume timer
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => {
        const newTime = prev + 1;
        const newProgress = (newTime / totalTime) * 100;
        setProgressPercent(newProgress);

        if (newTime >= totalTime) {
          endPracticeSession();
        }

        return newTime;
      });
    }, 1000);

    // Resume word display
    const msPerWord = Math.floor(60000 / practiceWPM);
    wordIntervalRef.current = setInterval(() => {
      setRealTimeMetrics((prev) => ({
        ...prev,
        wordsCompleted: prev.wordsCompleted + 1,
        wpm: Math.round((prev.wordsCompleted + 1) / (elapsedTime / 60) || 0),
      }));

      const currentWords = generatePracticeWords();
      setCurrentWord(currentWords[0]);
      setNextWords(currentWords.slice(1, 5));
    }, msPerWord);
  };

  // Reset practice session
  const resetPracticeSession = () => {
    pausePracticeSession();
    setElapsedTime(0);
    setProgressPercent(0);
    setResults(null);
    setRealTimeMetrics({
      accuracy: 100,
      wpm: 0,
      wordsCompleted: 0,
      totalWords: practiceContent[practiceDifficulty][practiceCategory].length,
    });
  };

  // Format time display (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (wordIntervalRef.current) clearInterval(wordIntervalRef.current);
    };
  }, []);

  // Update when difficulty or category changes
  useEffect(() => {
    resetPracticeSession();
  }, [practiceDifficulty, practiceCategory]);

  return (
    <div className="flex flex-col w-full h-full gap-4 p-4 mx-auto max-w-4xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Stenography Practice App</CardTitle>
          <CardDescription>
            Build your speed and accuracy with targeted practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="test">Testing</TabsTrigger>
            </TabsList>

            <TabsContent value="practice">
              <div className="grid gap-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select
                      value={practiceDifficulty}
                      onValueChange={setPracticeDifficulty}
                    >
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="category">Word Category</Label>
                    <Select
                      value={practiceCategory}
                      onValueChange={setPracticeCategory}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="common">Common Words</SelectItem>
                        <SelectItem value="legal">Legal Terms</SelectItem>
                        {practiceDifficulty === "beginner" ||
                        practiceDifficulty === "intermediate" ? (
                          <SelectItem value="numbers">
                            Numbers & Dates
                          </SelectItem>
                        ) : (
                          <SelectItem value="medical">Medical Terms</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="wpm">Speed (WPM): {practiceWPM}</Label>
                    <Slider
                      id="wpm"
                      min={20}
                      max={240}
                      step={5}
                      value={[practiceWPM]}
                      onValueChange={(value) => setPracticeWPM(value[0])}
                      disabled={isPlaying}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="duration">
                      Duration: {totalTime} seconds
                    </Label>
                    <Slider
                      id="duration"
                      min={30}
                      max={300}
                      step={30}
                      value={[totalTime]}
                      onValueChange={(value) => setTotalTime(value[0])}
                      disabled={isPlaying}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-end space-x-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="mute"
                        checked={!isMuted}
                        onCheckedChange={(checked) => setIsMuted(!checked)}
                      />
                      <Label htmlFor="mute">
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </Label>
                    </div>
                  </div>

                  <div className="flex items-end justify-end space-x-2">
                    <Button
                      onClick={resetPracticeSession}
                      variant="outline"
                      size="icon"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    {isPlaying ? (
                      <Button
                        onClick={pausePracticeSession}
                        variant="default"
                        size="icon"
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={
                          results ? resetPracticeSession : startPracticeSession
                        }
                        variant="default"
                        size="icon"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      onClick={endPracticeSession}
                      variant="outline"
                      size="icon"
                      disabled={!isPlaying}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 mt-4">
                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <p className="text-sm">Progress</p>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>
                          {formatTime(elapsedTime)} / {formatTime(totalTime)}
                        </span>
                      </div>
                    </div>
                    <Progress value={progressPercent} />
                  </div>

                  {/* Current word display */}
                  {(isPlaying || results) && (
                    <div className="mt-8 text-center">
                      <h2 className="text-lg font-medium mb-2">
                        Current Word:
                      </h2>
                      <div className="text-4xl font-bold p-4 rounded-lg bg-primary/5 border">
                        {results ? "Session Complete" : currentWord}
                      </div>

                      {!results && (
                        <div className="mt-4">
                          <h3 className="text-sm font-medium mb-2">
                            Coming Up:
                          </h3>
                          <div className="flex flex-wrap justify-center gap-2">
                            {nextWords.map((word, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 text-sm bg-secondary/10 rounded-full"
                              >
                                {word}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Real-time metrics */}
                  {(isPlaying || results) && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <p className="text-sm font-medium">WPM</p>
                          <p className="text-3xl font-bold">
                            {results ? results.wpm : realTimeMetrics.wpm}
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <p className="text-sm font-medium">Words</p>
                          <p className="text-3xl font-bold">
                            {results
                              ? results.wordsCompleted
                              : realTimeMetrics.wordsCompleted}
                            /{realTimeMetrics.totalWords}
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <p className="text-sm font-medium">Accuracy</p>
                          <p className="text-3xl font-bold">
                            {results
                              ? results.accuracy
                              : realTimeMetrics.accuracy}
                            %
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Results summary */}
                  {results && (
                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle>Session Results</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p>
                            <strong>Duration:</strong>{" "}
                            {formatTime(results.duration)}
                          </p>
                          <p>
                            <strong>Words Completed:</strong>{" "}
                            {results.wordsCompleted}
                          </p>
                          <p>
                            <strong>Words Per Minute:</strong> {results.wpm}
                          </p>
                          <p>
                            <strong>Accuracy:</strong> {results.accuracy}%
                          </p>

                          <div className="mt-4">
                            <h3 className="text-lg font-medium mb-2">
                              Performance Assessment:
                            </h3>
                            {results.wpm < 60 ? (
                              <p>
                                Keep practicing! Try to build speed by focusing
                                on common words and phrases.
                              </p>
                            ) : results.wpm < 120 ? (
                              <p>
                                Good progress! Continue working on pattern
                                recognition and brief forms.
                              </p>
                            ) : results.wpm < 180 ? (
                              <p>
                                Great work! You're approaching professional
                                speeds. Focus on maintaining accuracy.
                              </p>
                            ) : (
                              <p>
                                Excellent! You're performing at
                                certification-level speeds. Keep refining your
                                technique.
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="test">
              <div className="grid gap-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="test-type">Test Type</Label>
                    <Select defaultValue="literary">
                      <SelectTrigger id="test-type">
                        <SelectValue placeholder="Select test type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="literary">
                          Literary (180 WPM)
                        </SelectItem>
                        <SelectItem value="juryCharge">
                          Jury Charge (200 WPM)
                        </SelectItem>
                        <SelectItem value="testimony">
                          Testimony (225 WPM)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="test-duration">Test Duration</Label>
                    <Select defaultValue="5">
                      <SelectTrigger id="test-duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Minute</SelectItem>
                        <SelectItem value="3">3 Minutes</SelectItem>
                        <SelectItem value="5">
                          5 Minutes (Certification)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end justify-end space-x-2">
                    <Button className="w-full">Begin Certification Test</Button>
                  </div>
                </div>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>RPR Certification Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">
                          Literary - 180 WPM (5 Minutes)
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Material consisting of non-technical subject matter
                          with minimal punctuation, like magazine articles or
                          newspaper content.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium">
                          Jury Charge - 200 WPM (5 Minutes)
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Material consisting of instructions read by a judge to
                          a jury, with formal language and legal terminology.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium">
                          Testimony - 225 WPM (5 Minutes)
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Material consisting of question and answer dialogue,
                          like that found in depositions and court proceedings.
                        </p>
                      </div>

                      <div className="pt-4">
                        <p className="text-sm">
                          <strong>Passing Requirement:</strong> 95% accuracy on
                          all three tests
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Test Sample</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-secondary/10 p-4 rounded-md whitespace-pre-line">
                      Ladies and gentlemen of the jury, you must consider all
                      evidence presented during this trial and make your
                      decision based solely on the facts. The burden of proof
                      rests with the prosecution, who must demonstrate beyond
                      reasonable doubt that the defendant committed the alleged
                      crime.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Practice regularly to build muscle memory and speed. Aim for at
            least 15-30 minutes daily for best results.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StenoPracticeApp;
