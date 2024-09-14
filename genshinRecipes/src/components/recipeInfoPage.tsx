import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'

interface InfoPageProps {
    recipeTitle: string;
    recipeURL: string;
    isLiked: boolean;
}


function RecipeInfoPage({recipeTitle, recipeURL, isLiked}: InfoPageProps) {
}