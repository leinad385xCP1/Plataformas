from django.contrib import admin
from .models import PlayerProfile

# Register your models here.

@admin.register(PlayerProfile)
class PlayerProfileAdmin(admin.ModelAdmin):
    list_display = ('nickname', 'user__username', 'games_played', 'games_won', 'win_rate', 'total_winnings', 'created_at')
    list_filter = ('created_at', 'games_played')
    search_fields = ('nickname', 'user__username', 'user__email')
    readonly_fields = ('created_at', 'updated_at', 'win_rate')
    
    def user__username(self, obj):
        return obj.user.username
    user__username.short_description = 'Username'
