'use client';

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

interface Post {
  cmd: string;
  output: string;
  lesson: string;
}

const defaultPosts: Post[] = [
  {
    cmd: "npm run build",
    output: "❌ Build failed: 3 errors, 12 warnings",
    lesson: "Forgot to update the dependencies. Again."
  },
  {
    cmd: "git push origin main",
    output: "! [rejected] main -> main (fetch first)",
    lesson: "Classic. Git commit --amend strikes again."
  },
  {
    cmd: "python script.py",
    output: "SyntaxError: invalid syntax\n  print 'hello'",
    lesson: "Python 2 vs Python 3. Every single time."
  },
  {
    cmd: "code --version",
    output: "1.84.0\nDate: 2024-11-01",
    lesson: "VS Code updated. Half my extensions broke."
  },
  {
    cmd: "cat package.json | grep 'express'",
    output: '"express": "^4.18.2"',
    lesson: "Version mismatch between local and production."
  },
  {
    cmd: "deno run main.ts",
    output: "error: Module not found",
    lesson: "Deno needs file extensions. Python habits die hard."
  },
  {
    cmd: "sudo rm -rf node_modules",
    output: "Permission denied",
    lesson: "You don't have sudo. And honestly? Good."
  }
];

export default function MacTerminalGenerator() {
  const [posts, setPosts] = useState<Post[]>(defaultPosts);
  const [currentPost, setCurrentPost] = useState<Post>(defaultPosts[0]);
  const [customCommand, setCustomCommand] = useState('');
  const [customOutput, setCustomOutput] = useState('');
  const [customLesson, setCustomLesson] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);

  const generateRandomPost = () => {
    const randomIndex = Math.floor(Math.random() * posts.length);
    setCurrentPost(posts[randomIndex]);
    setShowCustom(false);
  };

  const addCustomPost = () => {
    if (customCommand && customOutput && customLesson) {
      const newPost: Post = {
        cmd: customCommand,
        output: customOutput,
        lesson: customLesson
      };
      setPosts([newPost, ...posts]);
      setCurrentPost(newPost);
      setCustomCommand('');
      setCustomOutput('');
      setCustomLesson('');
      setShowCustom(false);
    }
  };

  const downloadImage = async () => {
    if (!terminalRef.current) return;
    
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(terminalRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        useCORS: true
      });
      
      const link = document.createElement('a');
      link.download = `mac_terminal_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to capture:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  };

  const shareToTwitter = () => {
    // This would need a backend endpoint to upload the image
    alert('Twitter sharing requires backend image upload. Download first, then post manually.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-8">
      {/* Controls */}
      <div className="mb-6 flex gap-4 flex-wrap justify-center">
        <button
          onClick={generateRandomPost}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-mono transition"
          disabled={isCapturing}
        >
          🔄 Random Programming Post
        </button>
        
        <button
          onClick={() => setShowCustom(!showCustom)}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-mono transition"
        >
          ✏️ Create Custom
        </button>
        
        <button
          onClick={downloadImage}
          className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-mono transition"
          disabled={isCapturing}
        >
          {isCapturing ? '📸 Capturing...' : '📸 Download as PNG'}
        </button>
      </div>

      {/* Custom Post Form */}
      {showCustom && (
        <div className="mb-6 bg-gray-800 p-6 rounded-xl w-full max-w-2xl">
          <h3 className="text-white font-mono mb-4">Create Your Own Programming Struggle</h3>
          <input
            type="text"
            placeholder="Command (e.g., npm start)"
            value={customCommand}
            onChange={(e) => setCustomCommand(e.target.value)}
            className="w-full mb-3 p-2 bg-gray-700 text-white rounded font-mono"
          />
          <textarea
            placeholder="Output (e.g., Error: port already in use)"
            value={customOutput}
            onChange={(e) => setCustomOutput(e.target.value)}
            className="w-full mb-3 p-2 bg-gray-700 text-white rounded font-mono"
            rows={3}
          />
          <input
            type="text"
            placeholder="Lesson / Commentary (your 'coach noodles and fish' take)"
            value={customLesson}
            onChange={(e) => setCustomLesson(e.target.value)}
            className="w-full mb-3 p-2 bg-gray-700 text-white rounded font-mono"
          />
          <button
            onClick={addCustomPost}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
          >
            Add & Use This Post
          </button>
        </div>
      )}

      {/* macOS Terminal */}
      <div
        ref={terminalRef}
        className="mac-terminal w-full max-w-3xl bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Title Bar */}
        <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-2 border-b border-[#3a3a3a]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-[#aaaaaa] text-xs font-mono ml-3">
            zsh — ~/dev/programming-posts
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm">
          {/* Prompt line */}
          <div className="mb-4">
            <span className="text-[#00ff9d]">$</span>
            <span className="text-white ml-2">{currentPost.cmd}</span>
          </div>

          {/* Output */}
          <div className="ml-4 mb-4 text-[#cccccc] whitespace-pre-wrap">
            {currentPost.output}
          </div>

          {/* Lesson / Commentary */}
          <div className="ml-4 mb-6 text-[#ff6b6b]">
            ❌ {currentPost.lesson}
          </div>

          {/* Divider */}
          <div className="border-t border-[#3a3a3a] my-4"></div>

          {/* Footer */}
          <div className="flex justify-between items-center text-[#666666] text-xs">
            <span>💻 ~/dev/diary</span>
            <span>📅 {new Date().toLocaleDateString()} @ {new Date().toLocaleTimeString()}</span>
          </div>

          {/* Blinking cursor */}
          <div className="mt-4">
            <span className="text-[#00ff9d]">$</span>
            <span className="inline-block w-2 h-4 bg-[#00ff9d] ml-2 animate-pulse"></span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 text-center text-gray-400 text-sm max-w-2xl">
        <p className="font-mono">
          💡 Tip: Add your own programming struggles using the "Create Custom" button.<br/>
          Your commentary = original content = better reach.
        </p>
      </div>
    </div>
  );
}