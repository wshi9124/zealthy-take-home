class PageConfigsController < ApplicationController
    def index
        @page_configs = PageConfig.all
        render json: @page_configs
    end

    def create
        page_config_data = page_config_params
    
        page_config_data.each do |page, components|
          page_config = PageConfig.find_or_initialize_by(page: page.to_i)
          page_config.components = components
    
          unless page_config.save
            render json: { error: "Page #{page}: #{page_config.errors.full_messages.join(', ')}" }, status: :unprocessable_entity
            return
          end
        end
    
        render json: { message: "Page configurations updated successfully" }, status: :ok
      rescue => e
        render json: { error: e.message }, status: :unprocessable_entity
    end
    
    private
    
    def page_config_params
    # Permit dynamic keys and convert the ActionController::Parameters object to a hash
    params.require(:page_config).permit!.to_h
    end

end
