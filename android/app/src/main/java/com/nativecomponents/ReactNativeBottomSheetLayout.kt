package com.nativecomponents

import android.view.LayoutInflater
import android.view.View
import androidx.coordinatorlayout.widget.CoordinatorLayout
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.android.material.bottomsheet.BottomSheetBehavior.BottomSheetCallback
import kotlinx.android.synthetic.main.bottom_sheet.view.*

private const val STATE_CHANGE_EVENT_NAME = "BottomSheetStateChange"

class ReactNativeBottomSheetLayout : ViewGroupManager<CoordinatorLayout>() {

    enum class BottomSheetState {
        COLLAPSED,
        EXPANDED;

        fun toLowerCase() = this.toString().toLowerCase()
    }

    private val name = "BottomSheetLayout"
    private lateinit var container: CoordinatorLayout
    private lateinit var bottomSheet: CoordinatorLayout
    private lateinit var bottomSheetBehavior: BottomSheetBehavior<CoordinatorLayout>
    private var state: BottomSheetState = BottomSheetState.COLLAPSED

    override fun getName() = name

    override fun createViewInstance(reactContext: ThemedReactContext): CoordinatorLayout {
        val view = LayoutInflater.from(reactContext).inflate(
                R.layout.bottom_sheet,
                null
        ) as CoordinatorLayout
        container = view.container
        bottomSheet = view.bottomSheet
        bottomSheetBehavior = BottomSheetBehavior.from(bottomSheet).apply {
            addBottomSheetCallback(object : BottomSheetCallback() {
                override fun onSlide(bottomSheet: View, slideOffset: Float) = Unit

                override fun onStateChanged(bottomSheet: View, newState: Int) {
                    val state: BottomSheetState? = when (newState) {
                        BottomSheetBehavior.STATE_EXPANDED -> BottomSheetState.EXPANDED
                        BottomSheetBehavior.STATE_COLLAPSED -> BottomSheetState.COLLAPSED
                        else -> null
                    }
                    state?.let {
                        reactContext
                                .getJSModule(RCTDeviceEventEmitter::class.java)
                                .emit(STATE_CHANGE_EVENT_NAME, state.toLowerCase())
                    }
                }
            })
        }
        return view;
    }

    /**
     * Set the state of the bottom sheet to be one of [BottomSheetState].
     */
    @ReactProp(name = "sheetState")
    fun setSheetState(parent: CoordinatorLayout, newState: String?) {
        newState?.toLowerCase()?.let {
            if (it === state.toString().toLowerCase()) {
                return
            }
            bottomSheetBehavior.state = when (it) {
                BottomSheetState.EXPANDED.toLowerCase() -> BottomSheetBehavior.STATE_EXPANDED
                else -> BottomSheetBehavior.STATE_COLLAPSED
            }
        }
    }

    /**
     * The first child will always be used as the main content for the screen, and the second will
     * be used as the content for the bottom sheet.
     *
     * If more than two children are provided, then either the component was used incorrectly or
     * Quick Reload was triggered and it is providing us the same children again. In both cases we
     * will remove any existing views and start from scratch.
     */
    override fun addView(parent: CoordinatorLayout?, child: View?, index: Int) {
        // When Quick Reload is triggered during RN development it does not tear down native views.
        // This means we need to remove any existing children when a new child is passed, otherwise
        // they can add to the same root infinitely.
       if (container.childCount + bottomSheet.childCount > 1) {
           container.removeAllViews()
           bottomSheet.removeAllViews()
       }
        when (container.childCount) {
            0 -> container.addView(child)
            1 -> bottomSheet.addView(child)
        }
    }
}
