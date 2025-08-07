import LoadingSpinner from "./loadingSpinner";
import React from "react";
import "./matchingScreen.css";

function MatchingScreen({ isMatching }) {
  return (
    <div className="matching-screen">
      <h1 className="matching-title">マッチング中...</h1>
      <div className="spinner">
        {isMatching && <LoadingSpinner />}
        {/* 上でローディンんぐ画面になってる */}
      </div>
      <p className="matching-description">AIがタスク時間を計算中です...</p>
    </div>
  );
}
export default MatchingScreen;
