package com.nativecomponents

import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.coordinatorlayout.widget.CoordinatorLayout
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager

class ReactNativeBottomSheet : ViewGroupManager<ViewGroup>() {

    private val name = "BottomSheet"

    override fun getName() = name

    override fun createViewInstance(reactContext: ThemedReactContext): LinearLayout {
        return LinearLayout(reactContext)
    }
}
