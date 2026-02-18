package com.tapesh.foodingo;

import android.os.Bundle;
import android.view.Window;

import androidx.core.view.WindowCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Window window = getWindow();

        // Disable edge-to-edge layout
        WindowCompat.setDecorFitsSystemWindows(window, true);

        // Ensure status bar is NOT transparent
        window.setStatusBarColor(getResources().getColor(android.R.color.black));
    }
}
