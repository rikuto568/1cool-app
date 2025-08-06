import LoadingSpinner from "./loadingSpinner";
import React from "react";

function MatchingScreen({ isMatching }) {
  return (
    <div className="matching-screen">
      <h1>マッチング中...</h1>
      <div className="spinner">
        {isMatching && <LoadingSpinner />}
        {/* 上でローディンんぐ画面になってる */}
      </div>
      <p>AIがタスク時間を計算中です...</p>
    </div>
  );
}
export default MatchingScreen;
